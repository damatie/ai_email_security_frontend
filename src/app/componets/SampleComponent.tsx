// components/MyComponent.tsx
interface MyComponentProps {
  name: string;
}

function SampleComponent({ name }: MyComponentProps) {
  return <p>Hello, {name}!</p>;
}

export default SampleComponent;
