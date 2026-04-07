import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

export const cardVariants = cva(
    `
      rounded-lg border border-solid border-gray-200
      bg-white shadow-sm
    `,
    {
        variants: {
            size: {
                none: "",
                md: "p-5"
            }
        },
        defaultVariants: {
            size: "none"
        }
    }
);

interface CardProps extends VariantProps<typeof cardVariants>, 
    React.ComponentProps<"div">{
        // Fazendo isso, significa que posso receber qualquer elemento, ou seja, pode ser um article, uma div, uma section, etc. 
        // O "as" é uma convenção, mas poderia ser qualquer nome. 
        // O "as" é utilizado para dizer qual elemento HTML o componente deve renderizar. 
        // Por exemplo, se eu passar "as='article'", o componente vai renderizar um elemento <article> com as classes definidas no cardVariants. 
        // Se eu passar "as='section'", ele vai renderizar um elemento <section> com as mesmas classes. 
        // Se eu não passar o "as", ele vai renderizar um elemento <div> por padrão, porque o tipo do React.ComponentProps é "div".
        as?: keyof React.JSX.IntrinsicElements;
    }

export default function Card({
    as = "div",
    size, 
    children,
    className, 
    ...props}: CardProps){
    return React.createElement(
        as, {
            className: cardVariants({size, className}),
            ...props
        }, 
        children)
}