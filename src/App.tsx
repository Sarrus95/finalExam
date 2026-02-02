import {
  Alert,
  Center,
  Container,
  Loader,
  Table,
  Text,
  Title,
  Image,
  TextInput,
  Group,
  Select,
  SegmentedControl,
} from "@mantine/core";
import { useEffect, useState } from "react";
import type { Album } from "./types/Album";
import { fetchAlbums } from "./services/api";
import classes from "@styles/App.module.scss";

type OrderField = "createdAt" | "albumTitle" | "artist";
type OrderDir = "asc" | "desc";

const App = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [albumFilter, setAlbumFilter] = useState("");
  const [artistFilter, setArtistFilter] = useState("");

  const [orderBy, setOrderBy] = useState<OrderField>("createdAt");
  const [orderDir, setOrderDir] = useState<OrderDir>("desc");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const results = await fetchAlbums();
        if (!cancelled) {
          setAlbums(results);
          setFilteredAlbums(results);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Unknown error");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const filtered = albums.filter((album) => {
      const matchesAlbum = album.albumTitle
        .toLowerCase()
        .includes(albumFilter.toLowerCase());

      const matchesArtist = album.artist
        .toLowerCase()
        .includes(artistFilter.toLowerCase());

      return matchesAlbum && matchesArtist;
    });

    const sorted = [...filtered].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      if (orderBy === "createdAt") {
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
      } else {
        aValue = a[orderBy].toLowerCase();
        bValue = b[orderBy].toLowerCase();
      }

      if (aValue < bValue) return orderDir === "asc" ? -1 : 1;
      if (aValue > bValue) return orderDir === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredAlbums(sorted);
  }, [albumFilter, artistFilter, orderBy, orderDir, albums]);

  return (
    <div className={classes.page}>
      <Container size="md" className={classes.container}>
        <Title order={2} mb="md" ta="center">
          Albums
        </Title>

        {/* Filters */}
        <Group mb="md" grow>
          <TextInput
            label="Filter by album"
            placeholder="e.g. Abbey Road"
            value={albumFilter}
            onChange={(e) => setAlbumFilter(e.currentTarget.value)}
          />

          <TextInput
            label="Filter by artist"
            placeholder="e.g. The Beatles"
            value={artistFilter}
            onChange={(e) => setArtistFilter(e.currentTarget.value)}
          />
        </Group>

        <Group mb="md" grow>
          <Select
            label="Order by"
            value={orderBy}
            onChange={(value) => setOrderBy(value as OrderField)}
            data={[
              { value: "createdAt", label: "Date added" },
              { value: "albumTitle", label: "Album title" },
              { value: "artist", label: "Artist" },
            ]}
          />

          <SegmentedControl
            fullWidth
            value={orderDir}
            onChange={(value) => setOrderDir(value as OrderDir)}
            data={[
              { label: "Asc", value: "asc" },
              { label: "Desc", value: "desc" },
            ]}
          />
        </Group>

        {loading && (
          <Center mt="md">
            <Loader />
          </Center>
        )}

        {error && (
          <Alert color="red" title="Error" mt="md">
            {error}
          </Alert>
        )}

        {!loading && !error && filteredAlbums.length === 0 && (
          <Text c="dimmed" ta="center" mt="md">
            No albums match your filters.
          </Text>
        )}

        {!loading && !error && filteredAlbums.length > 0 && (
          <Table striped highlightOnHover withTableBorder mt="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Cover</Table.Th>
                <Table.Th>Album</Table.Th>
                <Table.Th>Artist</Table.Th>
                <Table.Th>Added</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {filteredAlbums.map((album) => (
                <Table.Tr key={album.id}>
                  <Table.Td>
                    <Image
                      src={album.imgURL}
                      alt={album.albumTitle}
                      w={48}
                      h={48}
                      radius="sm"
                      fit="contain"
                      loading="lazy"
                      fallbackSrc="/placeholder.png"
                    />
                  </Table.Td>
                  <Table.Td>{album.albumTitle}</Table.Td>
                  <Table.Td>{album.artist}</Table.Td>
                  <Table.Td>
                    {new Date(album.createdAt).toLocaleDateString()}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Container>
    </div>
  );
};

export default App;