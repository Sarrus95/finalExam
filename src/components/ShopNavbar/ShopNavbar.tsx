import {
  Box,
  Group,
  Text,
  Burger,
  ActionIcon,
  Image,
  Drawer,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconSearch,
  IconHeart,
  IconShoppingBag,
  IconChevronRight,
  IconX,
} from "@tabler/icons-react";

const menuItems = [
  "SNEAKERS",
  "CLOTHING",
  "ACCESSORIES",
  "DESIGN",
  "BRANDS",
  "VINTAGE",
  "MAGAZINE",
  "ACCOUNT",
];

const ShopNavbar = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Box
        h={56}
        px="sm"
        style={{
          borderBottom: "1px solid #eee",
          position: "sticky",
          top: 0,
          background: "white",
          zIndex: 100,
        }}
      >
        <Group h="100%" justify="space-between" wrap="nowrap">
          <Group gap="xs" align="center">
            <Burger opened={opened} onClick={open} hiddenFrom="md" size="sm" />

            <Box h={24} style={{ display: "flex", alignItems: "center" }}>
              <Image src="imgs/navbar/logo.png" h={18} fit="contain" />
            </Box>
          </Group>

          <Group gap={4}>
            <ActionIcon variant="subtle" size="sm">
              <IconSearch size={18} />
            </ActionIcon>
            <ActionIcon variant="subtle" size="sm">
              <IconHeart size={18} />
            </ActionIcon>
            <ActionIcon variant="subtle" size="sm">
              <IconShoppingBag size={18} />
            </ActionIcon>
          </Group>
        </Group>
      </Box>

      <Drawer
        opened={opened}
        onClose={close}
        position="top"
        size="100%"
        padding={0}
        withCloseButton={false}
        hiddenFrom="md"
      >
        <Group
          h={56}
          px="md"
          justify="space-between"
          style={{ borderBottom: "1px solid #eee" }}
        >
          <ActionIcon variant="subtle" onClick={close}>
            <IconX size={22} />
          </ActionIcon>

          <Group gap="md">
            <ActionIcon variant="subtle">
              <IconSearch size={22} />
            </ActionIcon>
            <ActionIcon variant="subtle">
              <IconHeart size={22} />
            </ActionIcon>
            <ActionIcon variant="subtle">
              <IconShoppingBag size={22} />
            </ActionIcon>
          </Group>
        </Group>

        <Stack gap={0} mt="sm">
          {menuItems.map((item) => (
            <Group
              key={item}
              px="md"
              py="lg"
              justify="space-between"
              style={{ borderBottom: "1px solid #f0f0f0" }}
            >
              <Text size="lg" fw={600}>
                {item}
              </Text>
              <IconChevronRight size={20} />
            </Group>
          ))}
        </Stack>
      </Drawer>
    </>
  );
};

export default ShopNavbar;
