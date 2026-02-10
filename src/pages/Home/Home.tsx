import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Text,
  Group,
  Select,
  Box,
  Stack,
  Collapse,
  ActionIcon,
  Loader,
  Center,
} from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { HeroCategory } from "@/components/HeroCategory/HeroCategory";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { getProducts } from "@/services/storeApi";
import type { Product } from "@/types/Product";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [sort, setSort] = useState<string | null>("latest");
  const [descOpen, setDescOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const filtered = products;

  const getMinPrice = (p: Product) => {
    const vals = Object.values(p.sizes).filter(
      (v): v is number => typeof v === "number",
    );
    return vals.length ? Math.min(...vals) : 0;
  };

  const sorted = [...filtered].sort((a, b) => {
    const pa = getMinPrice(a);
    const pb = getMinPrice(b);

    switch (sort) {
      case "price-asc":
        return pa - pb;

      case "price-desc":
        return pb - pa;

      case "name-asc":
        return a.name.localeCompare(b.name);

      case "name-desc":
        return b.name.localeCompare(a.name);

      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

      case "latest":
      default:
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  });

  return (
    <>
      <HeroCategory title="Abbligliamento" breadcrumb="Home" />

      <Box style={{ marginTop: -90, position: "relative", zIndex: 5 }}>
        <Container
          size={1400}
          bg="white"
          py="xl"
          px="xl"
          style={{
            borderRadius: 4,
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
          }}
        >
          <Stack align="center" gap="sm" mb="xl">
            <Text
              ta="center"
              c="dimmed"
              maw={720}
              lineClamp={descOpen ? undefined : 2}
            >
              Tutto il meglio dell&apos;abbigliamento Hype in edizione limitata
              e autentico 100%. Scopri migliaia di prodotti tra giacche, felpe,
              magliette, pantaloni e camicie dei più importanti brands della
              moda streetwear e di lusso.
            </Text>

            <Collapse in={descOpen}>
              <Text ta="center" c="dimmed" maw={720}>
                Collezioni esclusive, collaborazioni rare e pezzi iconici
                aggiornati ogni settimana. Filtra per brand, taglia e prezzo per
                trovare subito ciò che stai cercando.
              </Text>
            </Collapse>

            <ActionIcon color="black" variant="subtle" onClick={() => setDescOpen((o) => !o)}>
              {descOpen ? (
                <IconChevronUp size={18} />
              ) : (
                <IconChevronDown size={18} />
              )}
            </ActionIcon>
          </Stack>

          <Group justify="space-between" mb="lg">
            <Group>
              <Select
                label="Ordina per"
                size="xs"
                value={sort}
                onChange={setSort}
                placeholder="Ordina per"
                data={[
                  {
                    value: "price-asc",
                    label: "Prezzo: dal più basso al più alto",
                  },
                  {
                    value: "price-desc",
                    label: "Prezzo: dal più alto al più basso",
                  },
                  { value: "name-asc", label: "Nome: A-Z" },
                  { value: "name-desc", label: "Nome: Z-A" },
                  { value: "oldest", label: "Meno recenti" },
                  { value: "latest", label: "Più recenti" },
                ]}
              />
            </Group>
          </Group>

          {loading ? (
            <Center py="xl">
              <Loader />
            </Center>
          ) : (
            <Grid gutter={24}>
              {sorted.map((product) => (
                <Grid.Col
                  key={product.id}
                  span={{ base: 12, sm: 6, md: 4, lg: 3 }}
                >
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
        </Container>
      </Box>
    </>
  );
};

export default Home;
