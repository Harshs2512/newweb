// pages/api/fetch-and-insert-news.js
import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { NextResponse } from 'next/server'; // Import NextResponse
import { ConnectDB } from '@/lib/db/ConnectDB';
import UpcomingNewsModel from '@/lib/models/UpcomingNewsModel';

const RSS_URL = 'https://economictimes.indiatimes.com/rssfeeds/359241701.cms';

export async function POST(req) {
    try {
        await ConnectDB();

        // Step 1: Fetch data from the RSS feed
        const response = await axios.get(RSS_URL);
        const xmlData = response.data;

        // Step 2: Parse XML to JSON
        const jsonData = await parseStringPromise(xmlData);
        const newsItems = jsonData.rss.channel[0].item; // Adjust according to your XML structure

        // Step 3: Get current time
        const currentTime = new Date();
        const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000); // One hour ago

        // Step 4: Check if there are any existing records
        const existingRecords = await UpcomingNewsModel.find({});

        if (existingRecords.length > 0) {
            // Check if the latest record is older than one hour
            const latestRecord = existingRecords[0]; // Assuming records are sorted by createdAt in descending order
            console.log(latestRecord.createdAt < oneHourAgo, oneHourAgo, latestRecord.createdAt)
            if (latestRecord.createdAt < oneHourAgo) {
                // If older than one hour, delete old data
                await UpcomingNewsModel.deleteMany({});
                console.log('Old news data deleted.');
            } else {
                // If within one hour, return existing records without updating
                return NextResponse.json({ message: 'News data is up to date', existingRecords }, { status: 200 });
            }
        }

        // Step 5: Insert new data into the database
        const insertPromises = newsItems.map(async (item) => {
            const newsData = {
                title: item.title[0],
                description: item.description[0],
                link: item.link[0],
                pubDate: new Date(item.pubDate[0]),
                image: item.enclosure ? item.enclosure[0].$.url : null, // Extract the image URL
                createdAt: new Date(), // Set createdAt to current date
            };

            // Check if the news item already exists
            const existingItem = await UpcomingNewsModel.findOne({ link: newsData.link });

            if (!existingItem) {
                // Only insert if it doesn't exist
                await UpcomingNewsModel.create(newsData);
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
        const news = await UpcomingNewsModel.find({}).sort({ pubDate: -1 }); // -1 for descending order

        return NextResponse.json(news, { status: 200 });
    } catch (error) {
        console.error('Error fetching news:', error);
        return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
    }
}