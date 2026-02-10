import { useEffect, useState } from "react";
import { Container, Grid, Text, Stack, Loader, Center } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { getProducts } from "@/services/storeApi";
import type { Product } from "@/types/Product";
import { ProductCard } from "@/components/ProductCard/ProductCard";

function pickRandom<T>(arr: T[], n: number) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

export default function RecommendedProducts() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts()
      .then((all) => setItems(pickRandom(all, 4)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container size={1400} py="xl">
      <Stack gap="lg">
        <Text ta="center" size="xl" fw={600}>
          Ti potrebbe piacere
        </Text>

        {loading ? (
          <Center py="xl">
            <Loader />
          </Center>
        ) : (
          <Grid gutter={24}>
            {items.map((product) => (
              <Grid.Col key={product.id} span={{ base: 12, sm: 6, md: 3 }}>
                <ProductCard
                  product={product}
                  onClick={() =>
                    navigate(`/product/${product.id}`, {
                      state: { product },
                    })
                  }
                />
              </Grid.Col>
            ))}
          </Grid>
        )}
      </Stack>
    </Container>
  );
}
