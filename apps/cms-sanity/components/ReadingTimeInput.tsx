import { Box, Button, Flex, Stack, TextInput } from "@sanity/ui";
import { ChangeEvent, useCallback } from "react";
import readingTime from "reading-time";
import { NumberInputProps, set, unset, useFormValue } from "sanity";

export const readingStats = (text = "") => readingTime(text, { wordsPerMinute: 200 });

const statTypes = ["time", "words"] as const;
export type StatType = (typeof statTypes)[number];

export const ReadingTimeInput = ({
    value = 0,
    onChange,
    schemaType,
    readOnly,
    elementProps
}: NumberInputProps) => {
    const options = schemaType.options as any;
    const sourceField = options?.source;
    const statTypeField = statTypes.find(type => type === options?.statType) ?? statTypes[0];
    const content = useFormValue([sourceField]) as string;

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) =>
            onChange(event.currentTarget.value ? set(event.currentTarget.value) : unset()),
        [onChange]
    );
    const updateTransform = useCallback(() => {
        if (!content) return;

        const stats = readingStats(content);
        const statsMap: Record<StatType, number> = {
            time: Math.floor(stats.time / 1000),
            words: stats.words.total
        };
        onChange(set(statsMap[statTypeField]));
    }, [onChange, statTypeField, content]);

    return (
        <Stack space={3}>
            <Flex>
                <Box flex={1}>
                    <TextInput
                        {...elementProps}
                        type="number"
                        value={value}
                        onChange={handleChange}
                    />
                </Box>
                <Box marginLeft={1}>
                    <Button
                        mode="ghost"
                        type="button"
                        disabled={readOnly}
                        onClick={updateTransform}
                        text="Generate"
                    />
                </Box>
            </Flex>
        </Stack>
    );
};
