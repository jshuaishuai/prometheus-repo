"use client";
import Heading from "@/components/heading";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import axios from 'axios';
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button"
import Loader from "@/components/loader";
import Empty from "@/components/empty";
import { Card, CardFooter } from "@/components/ui/card";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import Image from "next/image";

const Conversation = () => {
    const [images, setImages] = useState<string[]>([]);
    const router = useRouter();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "1024x1024",
        }
    })

    // 2. Define a submit handler.

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);

        // setImages([]);
        try {
            const response = await axios.post('/api/image', values);
            const urls = response.data.map((img: { url: string }) => img.url);

            setImages((images) => [...images, ...urls]);
            form.reset();
        } catch (error: any) {
            console.log(error);

            // }
        } finally {
            router.refresh();
        }
    }

    const isLoading = form.formState.isSubmitting;

    return (
        <div>
            <Heading
                title="Image Generator"
                description="Our most advanced AI Image Generation model."
                icon={ImageIcon}
                iconColor="text-pink-700"
                bgColor="bg-pink-700/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form} >
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 "
                        >
                            <FormField
                                control={form.control}
                                name="prompt"
                                render={
                                    ({ field }) => (
                                        <FormItem className="col-span-12 lg:col-span-6">
                                            <FormControl className="m-0 p-0">
                                                <Input
                                                    {...field}
                                                    disabled={isLoading}
                                                    placeholder="Start typing here..."
                                                    className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }
                            />

                            <FormField
                                control={form.control}
                                name="amount"
                                render={
                                    ({ field }) => (
                                        <FormItem className="col-span-12 lg:col-span-2">
                                            <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={field.value} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {amountOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                            />

                            <FormField
                                control={form.control}
                                name="resolution"
                                render={
                                    ({ field }) => (
                                        <FormItem className="col-span-12 lg:col-span-2">
                                            <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={field.value} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {resolutionOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
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
                            <div className="p-20">
                                <Loader />
                            </div>
                        )}
                        {images.length === 0 && !isLoading && <Empty label="Start typing to generate images." />}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                            {
                                images.map((image, index) => (
                                    <Card key={index} className="relative aspect-square group" >
                                        <Image src={image} alt="image" fill />
                                        <CardFooter className="p-2 absolute bottom-1 right-1 left-1 hidden group-hover:block transition cursor-pointer">
                                            <Button onClick={() => window.open(image)} variant="secondary" className="w-full hover:">
                                                <Download className="h-4 w-4 mr-2" />Download
                                            </Button>
                                        </CardFooter>
                                    </Card>


                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Conversation;
