import { Container, Title, Box } from "@mantine/core";

export const FindUs = () => {
  return (
    <Container size={1400} py="xl">
      <Title order={2} ta="center" mb="lg">
        Dove Trovarci
      </Title>

      <Box
        style={{
          width: "100%",
          height: 260,
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        <iframe
          title="Store location"
          width="100%"
          height="100%"
          loading="lazy"
          style={{ border: 0 }}
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=Via+del+Babuino+178+Roma&output=embed"
        />
      </Box>
    </Container>
  );
};

export default FindUs;
