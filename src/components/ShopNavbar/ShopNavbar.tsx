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
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  IconSearch,
  IconHeart,
  IconShoppingBag,
  IconChevronRight,
  IconX,
  IconUser,
} from "@tabler/icons-react";

const ShopNavbar = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const NAV_HEIGHT = isMobile ? 52 : 64;
  const ICON_SIZE = isMobile ? 20 : 26;
  const ACTION_SIZE = isMobile ? 36 : 44;
  const DRAWER_ICON = isMobile ? 22 : 26;

  return (
    <>
      <Box
        h={NAV_HEIGHT}
        px="sm"
        style={{
          borderBottom: "1px solid #eee",
          position: "sticky",
          top: 0,
          background: "white",
          zIndex: 100,
          boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        }}
      >
        <Group h="100%" justify="space-between" wrap="nowrap">
          <Group gap="xs" align="center">
            <Burger
              opened={opened}
              onClick={open}
              hiddenFrom="xl"
              size={isMobile ? "sm" : "md"}
            />

            <Box h={24} style={{ display: "flex", alignItems: "center" }}>
              <Image
                src="imgs/navbar/logo.png"
                h={isMobile ? 16 : 20}
                fit="contain"
              />
            </Box>
          </Group>

          <Text
            visibleFrom="md"
            size="sm"
            fw={700}
            style={{
              letterSpacing: 1,
            }}
          >
            ABBIGLIAMENTO
          </Text>

          <Group gap={4}>
            <ActionIcon variant="subtle" w={ACTION_SIZE} h={ACTION_SIZE}>
              <IconSearch color="black" size={ICON_SIZE} />
            </ActionIcon>

            <ActionIcon
              variant="subtle"
              w={ACTION_SIZE}
              h={ACTION_SIZE}
              visibleFrom="md"
            >
              <IconUser color="black" size={ICON_SIZE} />
            </ActionIcon>

            <ActionIcon variant="subtle" w={ACTION_SIZE} h={ACTION_SIZE}>
              <IconHeart color="black" size={ICON_SIZE} />
            </ActionIcon>

            <ActionIcon variant="subtle" w={ACTION_SIZE} h={ACTION_SIZE}>
              <IconShoppingBag color="black" size={ICON_SIZE} />
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
          h={NAV_HEIGHT}
          px="md"
          justify="space-between"
          style={{ borderBottom: "1px solid #eee" }}
        >
          <ActionIcon
            variant="subtle"
            onClick={close}
            w={ACTION_SIZE}
            h={ACTION_SIZE}
          >
            <IconX size={DRAWER_ICON} />
          </ActionIcon>

          <Group gap="md">
            <ActionIcon variant="subtle" w={ACTION_SIZE} h={ACTION_SIZE}>
              <IconSearch color="black" size={DRAWER_ICON} />
            </ActionIcon>

            <ActionIcon variant="subtle" w={ACTION_SIZE} h={ACTION_SIZE}>
              <IconHeart color="black" size={DRAWER_ICON} />
            </ActionIcon>

            <ActionIcon variant="subtle" w={ACTION_SIZE} h={ACTION_SIZE}>
              <IconShoppingBag color="black" size={DRAWER_ICON} />
            </ActionIcon>
          </Group>
        </Group>

        <Stack gap={0} mt="sm">
          <Group
            px="md"
            py="lg"
            justify="space-between"
            style={{ borderBottom: "1px solid #f0f0f0" }}
          >
            <Text size="lg" fw={600}>
              ABBLIGLIAMENTO
            </Text>
            <IconChevronRight size={DRAWER_ICON} />
          </Group>

          <Group px="md" py="lg" justify="space-between" hiddenFrom="md">
            <Group>
              <IconUser color="black" size={DRAWER_ICON} />
              <Text size="lg" fw={600}>
                ACCOUNT
              </Text>
            </Group>
            <IconChevronRight color="black" size={DRAWER_ICON} />
          </Group>
        </Stack>
      </Drawer>
    </>
  );
};

export default ShopNavbar;
