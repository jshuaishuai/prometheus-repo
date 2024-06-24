import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
/**
 * 用于合并和处理 CSS 类名
 *
 * @param {...ClassValue} inputs - 要合并的类名。
 * @return {string} 合并后的类名字符串。
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/// clsx: 这是一个用于条件拼接类名的轻量级工具。它可以根据传入的参数动态地生成类名字符串。

/// twMerge: 这是一个用于合并 Tailwind CSS 类名的库。它可以智能地处理和合并冲突的 Tailwind 类名。


/*
示例
...inputs: ClassValue[]: 使用了 Rest 参数语法，表示 cn 函数可以接受任意数量的参数，这些参数的类型为 ClassValue。ClassValue 类型通常包含以下几种形式：
字符串，例如 "class1 class2"
数组，例如 ["class1", "class2"]
对象，例如 { class1: true, class2: false }，其中键是类名，值是布尔值，表示是否应用该类名

const className = cn("p-4", "text-center", { "bg-blue-500": true, "p-8": true });
console.log(className);

clsx 处理后生成的类名字符串为 "p-4 text-center bg-blue-500 p-8".
twMerge 进一步处理后，解决 p-4 和 p-8 的冲突，最终生成 "text-center bg-blue-500 p-8"。

*/
