import React from "react";
import {cva, type VariantProps} from "class-variance-authority";


export const textVariants = cva("font-sans text-gray-400", {
    variants: {
        variant:{
            "body-sm-bold": "text-sm leading-5 font-semibold",
            "body-md": "text-base leading-6 font-normal",
            "body-md-bold": "text-base leading-6 font-semibold"
        }
    },
    defaultVariants:{
        variant: "body-md"
    }
});

interface TextProps extends VariantProps<typeof textVariants> {
    // Define qual tag HTML será usada. O keyof React.JSX.IntrinsicElements garante que só tags válidas sejam usadas. 
    // Exemplos válidos: "span"; "p"; "h1";"div"
    as?: keyof React.JSX.IntrinsicElements;
    className?: string;
    children?: React.ReactNode;
}

export default function Text({
    as = "span",// Passei "span" pois precisa ter um valor padrão.
    variant,
    className, // Classes CSS (normal do React)
    children, // Conteúdo dentro do componente. Exemplo: <Text>Olá mundo</Text>
    ...props // Pega qualquer outra propriedade que não esteja dentro do "as";
}: TextProps){
    return React.createElement(
        as,
        {
            className: textVariants({variant, className}),
            ...props,
        },
        children
    );
}// Parei em 