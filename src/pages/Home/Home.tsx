import { useState } from "react";
import {
  Container,
  Grid,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Select,
  TextInput,
  Box,
  Stack,
  Collapse,
  ActionIcon,
} from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { HeroCategory } from "@/components/HeroCategory/HeroCategory";

const PRODUCTS = [
  {
    id: 1,
    name: "Oversized Hoodie Black",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1520975922323-6b3c2e5a1c55?q=80&w=1200",
    tag: "New",
  },
  {
    id: 2,
    name: "Street Tee White",
    price: 39,
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200",
    tag: "Hot",
  },
  {
    id: 3,
    name: "Cargo Pants",
    price: 119,
    image:
      "https://images.unsplash.com/photo-1503341733017-1901578f9f1e?q=80&w=1200",
  },
  {
    id: 4,
    name: "Zip Jacket",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200",
    tag: "New",
  },
  {
    id: 5,
    name: "Graphic Hoodie",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1200",
  },
  {
    id: 6,
    name: "Denim Jacket",
    price: 169,
    image:
      "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=1200",
  },
];

const PAGE_SIZE = 6;

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<string | null>("latest");
  const [page, setPage] = useState(1);
  const [descOpen, setDescOpen] = useState(false);

  const filtered = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return b.id - a.id;
  });

  const paged = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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

            <ActionIcon variant="subtle" onClick={() => setDescOpen((o) => !o)}>
              {descOpen ? (
                <IconChevronUp size={18} />
              ) : (
                <IconChevronDown size={18} />
              )}
            </ActionIcon>
          </Stack>

          <Group justify="space-between" mb="lg">
            <Button variant="outline" size="xs">
              FILTRI
            </Button>

            <Group>
              <TextInput
                size="xs"
                placeholder="Search products"
                value={search}
                onChange={(e) => {
                  setSearch(e.currentTarget.value);
                  setPage(1);
                }}
              />

              <Select
                size="xs"
                value={sort}
                onChange={setSort}
                data={[
                  { value: "latest", label: "Latest" },
                  { value: "price-asc", label: "Price ↑" },
                  { value: "price-desc", label: "Price ↓" },
                ]}
              />
            </Group>
          </Group>

          <Grid gutter={24}>
            {paged.map((product) => (
              <Grid.Col
                key={product.id}
                span={{ base: 12, sm: 6, md: 4, lg: 3 }}
              >
                <Box
                  style={{
                    cursor: "pointer",
                    transition: "transform .15s ease",
                  }}
                >
                  <Box bg="white" p="md">
                    <Image
                      src={product.image}
                      h={260}
                      fit="contain"
                      alt={product.name}
                    />
                  </Box>

                  <Group justify="space-between" mt="sm" mb={4}>
                    <Text size="xs" fw={500} lineClamp={1}>
                      {product.name}
                    </Text>
                    {product.tag && (
                      <Badge size="xs" variant="light">
                        {product.tag}
                      </Badge>
                    )}
                  </Group>

                  <Text size="sm" fw={700}>
                    €{product.price}
                  </Text>
                </Box>
              </Grid.Col>
            ))}
          </Grid>

        </Container>
      </Box>
    </>
  );
}
