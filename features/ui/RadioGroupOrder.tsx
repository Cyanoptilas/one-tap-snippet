import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

interface RadioGroupOrderProps {
  order: string;
  setOrder: (value: string) => void;
}

function RadioGroupOrder({ order, setOrder }: RadioGroupOrderProps) {
  return (
    <RadioGroup onChange={setOrder} value={order} mr={4}>
      <Stack direction="row">
        <Radio colorScheme="blue" value="asc">
          降順
        </Radio>
        <Radio colorScheme="blue" value="desc">
          昇順
        </Radio>
      </Stack>
    </RadioGroup>
  );
}

export default RadioGroupOrder;
