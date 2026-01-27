import { Alert, Center, Container, Loader, Table, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { fetchExampleClass } from "@services/api";
import type { ExampleClassRow } from "@appTypes/ExampleClass";

import classes from "@styles/App.module.scss";

const App = () => {
    const [data, setData] = useState<ExampleClassRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                setLoading(true);
                setError(null);

                const results = await fetchExampleClass({
                    limit: 20,
                    orderBy: "createdAt",
                    orderDir: "desc",
                });

                if (!cancelled) setData(results);
            } catch (e: unknown) {
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

    return (
        <div className={classes.page}>
            <Container size="md" className={classes.container}>
                <Title order={2} mb="md" ta="center">
                    ExampleClass – Parse REST Test
                </Title>

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

                {!loading && !error && data.length === 0 && (
                    <Text c="dimmed" ta="center" mt="md">
                        No records found.
                    </Text>
                )}

                {!loading && !error && data.length > 0 && (
                    <Table striped highlightOnHover withTableBorder mt="md">
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Price</Table.Th>
                                <Table.Th>Quantity</Table.Th>
                                <Table.Th>Created</Table.Th>
                            </Table.Tr>
                        </Table.Thead>

                        <Table.Tbody>
                            {data.map((row) => (
                                <Table.Tr key={row.objectId}>
                                    <Table.Td>{row.Name ?? "-"}</Table.Td>
                                    <Table.Td>{row.Price ?? "-"}</Table.Td>
                                    <Table.Td>{row.Quantity ?? "-"}</Table.Td>
                                    <Table.Td>{new Date(row.createdAt).toLocaleString()}</Table.Td>
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