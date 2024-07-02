"use client";
import Heading from "@/components/heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";
import { OpenAI } from 'openai';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism'; // 选择一个代码高亮主题
import { z } from "zod"
import axios from 'axios';

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import UserAvatar from '@/components/user-avatar';
import { Button } from "@/components/ui/button"
import BotAvatar from "@/components/bot-avatar";
import { Input } from "@/components/ui/input"
import Loader from "@/components/loader";
import Empty from "@/components/empty";
import { cn } from "@/lib/utils";

import { formSchema } from './constants';

const Conversation = () => {


    const [messages, setMessages] = useState<OpenAI.ChatCompletionMessage[]>([]);


    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        }
    })

    // 2. Define a submit handler.

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        const userMessage = {
            role: "user",
            content: values.prompt
        }
        const newMessages = [...messages, userMessage];
        try {
            const response = await axios.post('/api/conversation', {
                messages: newMessages,
            })
            setMessages((current) => [...current, userMessage, response.data]);

            form.reset();
        } catch (error: any) {
            console.log(error);

        }
    }

    const isLoading = form.formState.isSubmitting;

    return (
        <div>
            <Heading
                title="Conversation"
                description="Generate text using the power of AI."
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form} >
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 "
                        >
                            <FormField
                                name="prompt"
                                render={
                                    ({ field }) => (
                                        <FormItem className="col-span-12 lg:col-span-10">
                                            <FormControl className="m-0 p-0">
                                                <Input
                                                    {...field}
                                                    disabled={isLoading}
                                                    placeholder="Start typing here..."
                                                    className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )
                                }
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>

                <div className="space-y-4 mt-4">
                    <div className="p-8">
                        {isLoading && (
                            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                                <Loader />
                            </div>
                        )}
                        {messages.length === 0 && !isLoading && <Empty label="Start typing to have a conversation." />}
                        <div className="flex flex-col-reverse gap-y-4">
                            {
                                messages.map((message: any, index: number) => (
                                    <div
                                        key={index}
                                        className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", message.role === "user" ? "bg-white border borderblack/10" : "bg-muted")}>
                                        <p>{message.role === "user" ? <UserAvatar /> : <BotAvatar />}</p>
                                        <p><ReactMarkdown
                                            components={{
                                                code: ({ node, inline, className, children, ...props }) => {
                                                    const match = /language-(\w+)/.exec(className || '');
                                                    return !inline && match ? (
                                                        <SyntaxHighlighter style={okaidia} language={match[1]} PreTag="div" {...props}>
                                                            {String(children).replace(/\n$/, '')}
                                                        </SyntaxHighlighter>
                                                    ) : (
                                                        <code className={className} {...props}>
                                                            {children}
                                                        </code>
                                                    );
                                                },
                                            }}
                                        >
                                            {message.content || ""}
                                        </ReactMarkdown></p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Conversation;
