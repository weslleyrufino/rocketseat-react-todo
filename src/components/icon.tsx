import React from "react";

// Importa o cva para criar variantes de classe CSS.
// Importa VariantProps apenas como tipo, para extrair os tipos das variantes criadas.
import { cva, type VariantProps } from "class-variance-authority";

// Cria uma função chamada iconVariants que monta classes CSS com base nas variantes informadas.
export const iconVariants = cva("", {
  // Define as variantes disponíveis para o componente.
  variants: {
    // Variante chamada animate.
    animate: {
      // Quando animate for false, não adiciona nenhuma classe.
      false: "",

      // Quando animate for true, adiciona a classe animate-spin do Tailwind.
      true: "animate-spin",
    },
  },

  // Define os valores padrão das variantes.
  defaultVariants: {
    // Por padrão, animate será false.
    animate: false,
  },
});

// Define as props aceitas pelo componente Icon.
interface IconProps
  // Permite que o componente aceite props nativas de um SVG, como className, width, height, fill, onClick, etc.
  extends React.ComponentProps<"svg">,
    // Adiciona automaticamente as props das variantes criadas no iconVariants, como animate.
    VariantProps<typeof iconVariants> {
  // Define a prop obrigatória svg, que deve ser um componente React baseado em SVG.
  svg: React.FC<React.ComponentProps<"svg">>;
}

// Componente Icon.
// Recebe svg e renomeia para SvgComponent.
// Também recebe animate, className e o restante das props em ...props.
export default function Icon({
  svg: SvgComponent,// Renomeia a prop svg para SvgComponent para usar como componente React. Se eu não fizer isso, teria que usar <svg /> dentro do return, o que não é possível, pois svg é um componente React, não uma tag HTML.
  animate,
  className,
  ...props
}: IconProps) {
  // Renderiza o componente SVG recebido.
  // className recebe as classes geradas pelo cva, incluindo animate e classes extras.
  // ...props repassa outras props para o SVG, como width, height, fill, onClick, etc.
  return (
    <SvgComponent
      className={iconVariants({ animate, className })}
      {...props}
    />
  );
}