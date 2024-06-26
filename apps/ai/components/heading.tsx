
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';


interface HeadingProps {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor?: string;
    bgColor?: string;
}

const Heading = ({
    title,
    description,
    icon: Icon,
    iconColor,
    bgColor,
}: HeadingProps) => {
    return (
        <div className='flex px-4 lg:px-8 items-center gap-x-3 mb-8'>
            {/* lg: >= 1024px */}
            {/* w-fit 就像是一个可伸缩的盒子：盒子会根据小球的大小自动调整宽度，刚好包裹住小球，不会留出多余的空间。 */}
            <div className={cn("p-2 w-fit rounded-md", bgColor)}>
                <Icon className={cn("w-10 h-10", iconColor)} ></Icon>
            </div>
            <div>
                <h2 className='text-3xl font-bold'>{title}</h2>
                <p className='text-sm text-muted-foreground'>{description}</p>
            </div>
        </div>
    );
};

export default Heading;
