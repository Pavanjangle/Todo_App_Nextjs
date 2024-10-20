import { Container } from "@mantine/core"; // Import Mantine Container
import Todo from "@/components/Todo";
import '@mantine/core/styles.css';

export default async function Home() {
  return (
    <Container>
      <Todo />
    </Container>
  );
}
