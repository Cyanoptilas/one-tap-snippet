import { Button } from "@chakra-ui/react";

interface RadioGroupOrderProps {
  order: string;
  setOrder: (value: string) => void;
}

function RadioGroupOrder({ order, setOrder }: RadioGroupOrderProps) {
  const toggleOrder = () => {
    setOrder(order === "asc" ? "desc" : "asc");
  };

  return (
    <Button onClick={toggleOrder} colorScheme="blue" variant="outline" mr={2}>
      {order === "asc" ? "昇順" : "降順"}
    </Button>
  );
}

export default RadioGroupOrder;
