import { z } from "zod"

export const formSchema = z.object({
    prompt: z.string().min(1, { message: "Please enter a prompt." }),
    amount: z.string().min(1),
    resolution: z.string().min(1),
})


export const amountOptions = [
    {
        label: '1 Photo',
        value: "1",
    },
    {
        label: '2 Photo',
        value: "2",
    },
    {
        label: '3 Photo',
        value: "3",
    },
    {
        label: '4 Photo',
        value: "4",
    },
    {
        label: '5 Photo',
        value: "5",
    },
]

export const resolutionOptions = [
    {
        value: "1024x1024",
        label: "1024x1024",
    },
    {
        value: "1024x1792",
        label: "1024x1792",
    },
    {
        value: "1792x1024",
        label: "1792x1024",
    },
];
