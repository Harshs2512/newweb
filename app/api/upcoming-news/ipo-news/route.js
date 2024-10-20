// pages/api/fetch-and-insert-news.js
import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { NextResponse } from 'next/server'; // Import NextResponse
import { ConnectDB } from '@/lib/db/ConnectDB';
import IpoNewsModel from '@/lib/models/IpoNewsModel';

const RSS_URL = 'https://economictimes.indiatimes.com/markets/ipos/fpos/rssfeeds/14655708.cms';

export async function POST(req) { // Use the POST function for fetching data
    try {
        await ConnectDB();

        // Step 1: Fetch data from the RSS feed
        const response = await axios.get(RSS_URL);
        const xmlData = response.data;

        // Step 2: Parse XML to JSON
        const jsonData = await parseStringPromise(xmlData);
        const newsItems = jsonData.rss.channel[0].item; // Adjust according to your XML structure

        // Step 4: Insert data into the database with duplicate check
        const insertPromises = newsItems.map(async (item) => {
            const newsData = {
                title: item.title[0],
                description: item.description[0],
                link: item.link[0],
                pubDate: new Date(item.pubDate[0]),
                image: item.enclosure ? item.enclosure[0].$.url : null, // Extract the image URL
            };

            // Check if the news item already exists
            const existingItem = await IpoNewsModel.findOne({ link: newsData.link });

            if (!existingItem) {
                // Only insert if it doesn't exist
                await IpoNewsModel.create(newsData);
            }
        });

        await Promise.all(insertPromises);

        // Send a success response
        return NextResponse.json({ message: 'News data fetched and inserted successfully' }, { status: 200 });
    } catch (error) {
        console.error("Error fetching or inserting news data:", error);
        // Send an error response
        return NextResponse.json({ message: 'Error fetching or inserting news data', error: error.message }, { status: 500 });
    }
}

export async function GET(req, res) {
    try {
        await ConnectDB();

        // Fetch and sort news by published date in descending order
        const news = await IpoNewsModel.find({}).sort({ pubDate: -1 }); // -1 for descending order

        return NextResponse.json(news, { status: 200 });
    } catch (error) {
        console.error('Error fetching news:', error);
        return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
    }
}