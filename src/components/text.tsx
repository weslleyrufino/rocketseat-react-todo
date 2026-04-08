import React from "react";
import {cva, type VariantProps} from "class-variance-authority";

// O que está dentro de "cva("font-sans text-gray-400"," são os estilos base.
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
    // <Text as="p" />
    // <Text as="h1" />
    // <Text as="span" />
    as?: keyof React.JSX.IntrinsicElements;
    className?: string;

    // Define o que vai dentro do componente:
    // Por exemplo: <Text>Olá mundo</Text>
    // "Olá mundo" é o children.

    // Com o React.ReactNode ele aceita tudo que o React consegue renderizar, como:
    // string → "Olá"
    // number → 123
    // JSX → <span>Oi</span>
    // array → [<div />, <div />]
    // null / undefined / boolean
    children?: React.ReactNode;
    // Se eu passasse um "children?: string", ele permitiria apenas um <Text>Olá mundo</Text>, mas não um:
    //  <Text><span>Olá</span><span>Mundo</span></Text>
    // OU
    // <Text> {true && <span>Oi</span>}</Text>
    // OU
    // <Text> <strong>Olá</strong></Text>
    // OU
    // <Text> {undefined} </Text>
}

export default function Text({
    as = "span",// Qual tag irá usar. Passei "span" pois precisa ter um valor padrão.
    variant,    // Variantes de estilo, como "body-sm-bold", "body-md" e "body-md-bold"
    className, // Classes CSS (normal do React)
    children, // Conteúdo dentro do componente. Exemplo: <Text>Olá mundo</Text>
    ...props // Pega qualquer outra propriedade que não esteja dentro do "as" (ex: id, onClick, etc.);
}: TextProps){
    return React.createElement(
        as,
        {
            className: textVariants({variant, className}),
            ...props,
        },
        children
    );
}
// Resumão final
// cva → cria variações de estilo
// VariantProps → tipa automaticamente o variant
// as → permite trocar a tag HTML dinamicamente
// children → conteúdo interno do componente
// createElement → cria o elemento manualmente
// children fora do {} → porque não é prop, é argumento separado