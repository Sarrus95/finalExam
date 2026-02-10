import { Container, Overlay, Stack, Text, Title } from "@mantine/core";
import classes from "./HeroCategory.module.css";

type HeroCategoryProps = {
  title: string;
  breadcrumb?: string;
  image?: string;
};

export function HeroCategory({
  title,
  breadcrumb,
  image = "/imgs/home/hero_back.jpg",
}: HeroCategoryProps) {
  return (
    <div
      className={classes.wrapper}
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* gradient + darkening handled by overlay */}
      <Overlay color="#000" opacity={0.45} zIndex={1} />

      <Container size="lg" className={classes.inner}>
        <Stack align="center" gap={6}>
          <Title
            c="white"
            style={{
              fontSize: "clamp(20px, 4vw, 32px)",
              fontWeight: 600,
            }}
          >
            {title}
          </Title>

          {breadcrumb && (
            <Text size="xs" c="white" opacity={0.9}>
              {breadcrumb}
            </Text>
          )}
        </Stack>
      </Container>
    </div>
  );
}