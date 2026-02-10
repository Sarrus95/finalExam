import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import {
  Container,
  Grid,
  Image,
  Text,
  Stack,
  Select,
  Button,
  Group,
  Paper,
  Accordion,
  Loader,
  Center,
  Modal,
  Tooltip,
} from "@mantine/core";
import { getProduct } from "@/services/storeApi";
import type { Product } from "@/types/Product";
import RecommendedProducts from "@/components/RecommendedProducts/RecommendedProducts";

export default function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();

  const passedProduct = location.state?.product as Product | undefined;

  const [product, setProduct] = useState<Product | null>(passedProduct ?? null);

  const [loading, setLoading] = useState(!passedProduct);
  const [imgIndex, setImgIndex] = useState(0);
  const [size, setSize] = useState<string | null>(null);

  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (product || !id) return;

    setLoading(true);
    getProduct(id)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [id, product]);

  useEffect(() => {
    setImgIndex(0);
    setSize(null);
  }, [id]);
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  const handleAddToCart = () => {
    if (!size) return;
    open();
  };

  if (loading)
    return (
      <Center py="xl">
        <Loader />
      </Center>
    );

  if (!product) return <Text>Prodotto non trovato</Text>;

  const images = product.images ?? [];

  const sizeOptions = Object.entries(product.sizes)
    .filter(([, price]) => typeof price === "number")
    .map(([s, price]) => ({
      value: s,
      label: `${s} — ${price} €`,
    }));

  const prices = Object.values(product.sizes).filter(
    (v): v is number => typeof v === "number",
  );

  const minPrice = prices.length ? Math.min(...prices) : 0;

  return (
    <>
      <Container size={1400} py="xl">
        <Modal opened={opened} onClose={close} title="Carrello" centered>
          <Text>Prodotto aggiunto al carrello</Text>
          <Text size="sm" c="dimmed" mt="xs">
            {product.name} — taglia {size}
          </Text>
        </Modal>

        <Grid gutter={40}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image
              src={images[imgIndex]}
              h={520}
              fit="contain"
              fallbackSrc="/placeholder.png"
            />

            {images.length > 1 && (
              <Group justify="center" mt="sm">
                <Button
                  variant="subtle"
                  onClick={() =>
                    setImgIndex((i) => (i === 0 ? images.length - 1 : i - 1))
                  }
                >
                  ←
                </Button>

                <Button
                  variant="subtle"
                  onClick={() =>
                    setImgIndex((i) => (i === images.length - 1 ? 0 : i + 1))
                  }
                >
                  →
                </Button>
              </Group>
            )}
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="md">
              <Text size="xl" fw={700}>
                {product.name}
              </Text>

              <Text size="lg">
                A partire da <b>{minPrice} €</b>
              </Text>

              <Select
                placeholder="Seleziona la taglia"
                data={sizeOptions}
                value={size}
                onChange={setSize}
              />

              <Group>
                <Tooltip label="Seleziona una taglia" disabled={!!size}>
                  <div>
                    <Button
                      size="md"
                      disabled={!size}
                      onClick={handleAddToCart}
                    >
                      AGGIUNGI AL CARRELLO
                    </Button>
                  </div>
                </Tooltip>

                <Button variant="default">♡</Button>
              </Group>

              <Paper p="md" withBorder>
                <Group justify="space-between">
                  <Text size="sm">Reso</Text>
                  <Text size="sm">Autenticità</Text>
                </Group>
              </Paper>

              <Accordion variant="separated">
                <Accordion.Item value="pay">
                  <Accordion.Control>Metodi di pagamento</Accordion.Control>
                  <Accordion.Panel>Carte, PayPal, Bonifico</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="details">
                  <Accordion.Control>Dettagli prodotto</Accordion.Control>
                  <Accordion.Panel>{product.description}</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="ship">
                  <Accordion.Control>Spedizione</Accordion.Control>
                  <Accordion.Panel>24–48h Italia</Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>

      <RecommendedProducts />
    </>
  );
}
