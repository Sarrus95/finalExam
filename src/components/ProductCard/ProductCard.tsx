import type { Product } from "@/types/Product";
import { Card, Image, Text, Stack, Box } from "@mantine/core";

type Props = {
  product: Product;
  onClick?: () => void;
};

export function ProductCard({ product, onClick }: Props) {
  const firstImage = product.images?.[0] ?? "/placeholder.png";

  const prices = Object.values(product.sizes).filter(
    (v): v is number => typeof v === "number",
  );

  const minPrice = prices.length ? Math.min(...prices) : 0;

  return (
    <Card
      padding="md"
      radius={0}
      onClick={onClick}
      style={{
        background: "#f5f5f5",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
    >
      <Box
        h={260}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#eee",
        }}
      >
        <Image src={firstImage} alt={product.name} fit="contain" h={240} />
      </Box>

      <Stack
        gap="xs"
        mt="sm"
        style={{
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <Text ta="center" size="sm" lineClamp={2}>
          {product.name}
        </Text>

        <Text fw={700} size="lg" ta="center">
          {minPrice} €
        </Text>
      </Stack>
    </Card>
  );
}