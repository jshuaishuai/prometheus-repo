"use client";
import Heading from "@/components/heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import axios from 'axios';
import { useState } from "react";
import { OpenAI } from 'openai';

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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

        try {
            const userMessage = {
                role: "user",
                content: values.prompt
            }

            const newMessages = [...messages, userMessage];


            const response = await axios.post('/api/conversation', {
                messages: newMessages,
            })
            setMessages((current) => [...current, userMessage, response.data]);

            form.reset();
        } catch (e) {
            console.log('%c [ e ]-52', 'font-size:13px; background:pink; color:#bf2c9f;', e)

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
            <div className="">
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

                <div className="space-y-4 mt-4">contents</div>
            </div>
        </div>

    );
};

export default Conversation;
