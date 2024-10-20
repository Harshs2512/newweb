"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form, FormControl, FormField, FormItem, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


const FinancialHealth = () => {
    const router = useRouter();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [userdata, setUserData] = useState([]);
    const FormSchema = z.object({
        username: z.string().min(2, { message: "Username must be at least 2 characters." }),
        mobile: z.string().nonempty({ message: "Mobile number is required." }),
        email: z.string().email({ message: "Invalid email address." }),
        message: z.string().optional(),
        captcha: z.string().nonempty({ message: "Please complete the CAPTCHA." }),
    });

    // const questions = [
    //     {
    //         question: "1. Which of these investments would you feel more comfortable owning?",
    //         answers: [
    //             { text: "Fixed deposit", marks: 1 },
    //             { text: "Government stock", marks: 2 },
    //             { text: "Shares in older established companies", marks: 3 },
    //             { text: "Blue Chip international investments", marks: 4 },
    //             { text: "Shares in overseas emerging markets", marks: 5 }
    //         ]
    //     },
    //     {
    //         question: "2. Is your future financial goal",
    //         answers: [
    //             { text: "Vital, such as saving for your child s future education or saving for your retirement?", marks: 1 },
    //             { text: "Important such as paying off your car early?", marks: 2 },
    //             { text: "A luxury that you can do without, such as an overseas holiday?", marks: 3 },
    //         ]
    //     },
    //     {
    //         question: "3. What is your primary financial goal?",
    //         answers: [
    //             { text: "Capital Protection: Protection of your capital against a decline in the market value of your investments.", marks: 1 },
    //             { text: "Capital Income: To receive an income generated from your investments.", marks: 2 },
    //             { text: "Consistency: A high degree of stability and predictability of your investment return over time.", marks: 3 },
    //             { text: "Long- Term Inflation Hedge: High degree of protection of long-term purchasing power of your investment.", marks: 4 },
    //             { text: "Capital Appreciation: Increase in market value of your investments, primarily through capital growth in excess of inflation.", marks: 5 }
    //         ]
    //     },
    //     {
    //         question: "4. Which of the following investment returns would most appeal to you if you were to invest an initial amount of Rs 20 000 for one year?",
    //         answers: [
    //             { text: "A guaranteed amount of Rs 21 000.", marks: 1 },
    //             { text: "Any amount between Rs 20 000 to Rs 22 000.", marks: 2 },
    //             { text: "Any amount between Rs 18 000 to Rs 23 000.", marks: 3 },
    //             { text: "Any amount between Rs 15 000 to Rs 26 000.", marks: 4 },
    //             { text: "Any amount between Rs 0 to Rs 30 000.", marks: 5 },
    //         ]
    //     },
    //     {
    //         question: "5. Please select the statement most applicable to you:",
    //         answers: [
    //             { text: "I would rather protect my assets, even though there may be limited growth potential.", marks: 1 },
    //             { text: "I would rather experience steady growth each year.", marks: 2 },
    //             { text: "I would like high growth even though it may mean very volatile returns in the short term.", marks: 3 },
    //         ]
    //     },
    //     {
    //         question: "6. Please select the statement most applicable to you:",
    //         answers: [
    //             { text: "I believe that I will not have enough money for my goal and therefore don�t want to lose what I already have.", marks: 1 },
    //             { text: "I believe that I will have enough money for my goal and therefore would like a consistent long-term investment.", marks: 2 },
    //             { text: "I believe that I will have more than enough money for my goal and therefore can afford to be more aggressive with the investments that I make.", marks: 3 },
    //         ]
    //     },
    //     {
    //         question: "7. I am prepared to accept short-term losses if I believe the long-term returns will be good.",
    //         answers: [
    //             { text: "Strongly Agree", marks: 1 },
    //             { text: "Agree", marks: 2 },
    //             { text: "Neutral", marks: 3 },
    //             { text: "Disagree", marks: 4 },
    //             { text: "Strongly Disagree", marks: 5 },
    //         ]
    //     },
    //     {
    //         question: "8. I would quit my job and start my own business if the right opportunity arose.",
    //         answers: [
    //             { text: "Strongly Agree", marks: 1 },
    //             { text: "Agree", marks: 2 },
    //             { text: "Neutral", marks: 3 },
    //             { text: "Disagree", marks: 4 },
    //             { text: "Strongly Disagree", marks: 5 },
    //         ]
    //     },
    //     {
    //         question: "9. I expect my investment earnings to increase in line with inflation over the next 5 years.",
    //         answers: [
    //             { text: "Strongly Agree", marks: 1 },
    //             { text: "Agree", marks: 2 },
    //             { text: "Neutral", marks: 3 },
    //             { text: "Disagree", marks: 4 },
    //             { text: "Strongly Disagree", marks: 5 },
    //         ]
    //     },
    //     {
    //         question: "10. I have sufficient funds set aside to cover most emergencies.",
    //         answers: [
    //             { text: "Strongly Agree", marks: 1 },
    //             { text: "Agree", marks: 2 },
    //             { text: "Neutral", marks: 3 },
    //             { text: "Disagree", marks: 4 },
    //             { text: "Strongly Disagree", marks: 5 },
    //         ]
    //     },

    //     // Add more questions as needed
    // ];

    const fetchQuestions = async () => {
        const response = await axios.get("/api/financialhealth/");
        if (response.status == 200) {
            setQuestions(response.data)
        }
    }

    useEffect(() => { fetchQuestions() }, [])

    const InquiryForm = ({ onClose }) => {
        const [captchaValue, setCaptchaValue] = useState('');
        const form = useForm({
            resolver: zodResolver(FormSchema),
            defaultValues: {
                username: "",
                mobile: "",
                email: "",
                message: "",
                captcha: "",
            },
        });

        useEffect(() => {
            generateCaptcha();
        }, []);

        // Function to generate a random CAPTCHA
        const generateCaptcha = () => {
            const captcha = Math.random().toString(36).substring(2, 7); // Random string of 5 characters
            setCaptchaValue(captcha);
        };

        // Handle form submission
        const onSubmit = async (data) => {
            setLoading(true)
            if (data.captcha !== captchaValue) {
                alert("CAPTCHA is incorrect. Please try again.");
                generateCaptcha(); // Regenerate CAPTCHA if incorrect
                return;
            }
            const emaildata = {
                user: data?.username,
                to: data?.email,
                subject: 'Test Email',
                text: 'This is a test email sent from Nodemailer!',
            }
            setUserData(data)
            setIsModalOpen(false)
            // try {
            //     const response = await axios.post('/api/leads/', data);
            //     const info = await axios.post('/api/email/', emaildata);
            //     console.log(info)
            //     if (response.status == 201) {
            //         toast({
            //             description: "Your message has been sent.",
            //         })
            //         form.reset();
            //         generateCaptcha();
            //         setIsModalOpen(false)
            //     } else {
            //         alert(response.statusText);
            //     }
            // } catch (error) {
            //     console.error('Error:', error);
            //     alert("An unexpected error occurred.");
            // }
            // finally {
            //     setLoading(false)
            // }
            setLoading(false)
        };

        return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 rounded p-7 bg-white">
                    <h1 className="font-medium text-xl">Please Fill Your Detail Carefully...</h1>
                    {/* Username Field */}
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="User Name" {...field} aria-label="User Name" className="border-2 border-gray-500" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Mobile Field */}
                    <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Mobile" {...field} aria-label="Mobile Number" className="border-2 border-gray-500" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email Field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="email" placeholder="Email" {...field} aria-label="Email" className="border-2 border-gray-500" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Message Field */}
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <textarea placeholder="Message" {...field} className="w-full border-2 border-gray-500 p-1 rounded" aria-label="Message" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* CAPTCHA */}
                    <div className="max-w-xl">
                        <FormField
                            control={form.control}
                            name="captcha"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Enter CAPTCHA" {...field} aria-label="CAPTCHA" className="border-2 border-gray-500" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center mt-5">
                            <p className="bg-gray-200 p-2 rounded mr-1">{captchaValue}</p>
                            <button
                                type="button"
                                onClick={generateCaptcha}
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                            >
                                Refresh CAPTCHA
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit">{!loading ? "Submit" : "Loading..."}</Button>
                </form>
            </Form>
        );
    };

    const handleNextClick = () => {
        if (selectedAnswer === null) {
            alert("Please select an answer before proceeding");
            return;
        }
        const newAnswer = {
            question: questions[currentQuestionIndex].question,
            selectedAnswerMarks: selectedAnswer,
        };

        // Update score
        setScore(score + selectedAnswer);

        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex >= questions.length) {
            const finalAnswers = [...answers, newAnswer];
            setAnswers(finalAnswers);
            sendAllAnswersToAPI(finalAnswers);
            setIsQuizCompleted(true);
        } else {
            setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
            setCurrentQuestionIndex(nextQuestionIndex);
            setSelectedAnswer(null);
        }
    };

    const sendAllAnswersToAPI = async (answers) => {
        let healthprofile
        const totalScore = answers.reduce((acc, curr) => acc + curr.selectedAnswerMarks, 0);
        if (totalScore >= 1 && totalScore <= 3) {
            healthprofile = "Critical"
        }
        else if (totalScore >= 4 && totalScore <= 5) {
            healthprofile = "Weak"
        }
        else if (totalScore >= 6 && totalScore <= 7) {
            healthprofile = "Border Line"
        }
        else if (totalScore >= 8 && totalScore <= 9) {
            healthprofile = "Fit"
        }
        else {
            healthprofile = "Excellent"
        }
        const payload = {
            user: userdata,
            score: totalScore,
            answers: answers,
            healthprofile: healthprofile
        };
        await axios.post("/api/financialhealth/", payload);
    };

    const handleAnswerSelect = (mark) => {
        console.log(mark)
        setSelectedAnswer(mark);
    };

    const getResultMessage = () => {
        if (score >= 1 && score <= 3) return { message: "Critical", color: "text-red-500" };
        if (score >= 4 && score <= 5) return { message: "Weak", color: "text-yellow-600" };
        if (score >= 6 && score <= 7) return { message: "Border Line", color: "text-yellow-400" };
        if (score >= 8 && score <= 9) return { message: "Fit", color: "text-green-400" };
        return { message: "Excellent", color: "text-green-500" };
    };

    return (
        <div className="max-w-3xl mx-auto my-32 p-6 bg-rose-50 shadow-lg rounded-lg">
            <Toaster />
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-3 rounded-lg shadow-lg w-[30rem] bg-white">
                        <InquiryForm onClose={() => {
                            setIsModalOpen(false);
                        }} />
                    </div>
                </div>
            )}
            {isQuizCompleted ? (
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">Your Total Score: {score}</h2>
                    <div className={`text-4xl font-semibold mb-4 ${getResultMessage().color}`}>
                        {getResultMessage().message}
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
                        <p className="text-lg">Here’s what your score means:</p>
                        <ul className="mt-2 text-left">
                            <li className="mb-3 text-gray-600"><span className="text-bold text-lg text-gray-900">Critical: </span> Your financial situation is at a very critical level and you need to get some professional help before its too late. We will soon send you a thorough analysis of your financial health.</li>
                            <li className="mb-3 text-gray-600"><span className="text-bold text-lg text-gray-900">Weak: </span>Your financial situation is weak. There are certain basic areas that you have taken care of but a majority of them needs to  be worked upon. We will soon send you a thorough analysis of your financial health.</li>
                            <li className="mb-3 text-gray-600"><span className="text-bold text-lg text-gray-900">Border Line: </span>We We can see that you have put in effort to plan your finances. But at the same time there certain areas that have been completely ignored. A correct direction along with proper risk profiling and asset allocation is what you might need.</li>
                            <li className="mb-3 text-gray-600"><span className="text-bold text-lg text-gray-900">Fit: </span>Good care has been taken in planning your financial life. A good asset allocation and portfolio rebalancing may be required. It will show help in maximising returns by minimizing the risk. We will soon send you a thorough analysis of your financial health.</li>
                            <li className="mb-3 text-gray-600"><span className="text-bold text-lg text-gray-900">Excellent:</span> We appreciate the effort you have put into financial planning. You are in the correct direction. Make sure you rebalance your portfolio regularly. We will soon send you a thorough analysis of your financial health.</li>
                        </ul>
                    </div>
                    <button
                        onClick={() => {
                            // Reset the quiz
                            setCurrentQuestionIndex(0);
                            setScore(0);
                            setIsQuizCompleted(false);
                            setSelectedAnswer(null);
                            router.push("/")
                        }}
                        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Back Home
                    </button>
                </div>
            ) : (
                <div className="flex flex-col">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">{currentQuestionIndex + 1}. {questions[currentQuestionIndex]?.question}</h2>
                    <div className="mb-4 ">
                        <div className="flex items-center mb-2">
                            <input
                                type="radio"
                                id={'answer'}
                                name="answer"
                                value={1}
                                checked={selectedAnswer === 1}
                                onChange={() => handleAnswerSelect(1)}
                                className="mr-2"
                            />
                            <label htmlFor={'answer'} className="text-lg text-gray-800">Yes</label>
                        </div>
                        <div className="flex items-center mb-2">
                            <input
                                type="radio"
                                id={'answer'}
                                name="answer"
                                value={1}
                                checked={selectedAnswer === 0}
                                onChange={() => handleAnswerSelect(0)}
                                className="mr-2"
                            />
                            <label htmlFor={'answer'} className="text-lg text-gray-800">No</label>
                        </div>
                    </div>
                    <Button
                        onClick={() => handleNextClick(questions[currentQuestionIndex]?.question)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
};

export default FinancialHealth;