import { Button, Flex, Modal } from "@mantine/core";

interface ConfirmProp {
  opened: boolean;
  close: () => void;
  onConfirm: () => void;
  loading: boolean;
  button: {
    title: string;
    message: string;
    btn: string;
  };
}

const ConfirmData = ({
  opened,
  close,
  onConfirm,
  button,
  loading,
}: ConfirmProp) => {

  return (
    <Modal
      key={Math.random()}
      zIndex={100}
      opened={opened}
      onClose={close}
      centered
      title={button.title}
    >
      {button.message}
      <Flex gap={10} justify={"end"} mt={5}>
        <Button
          bg="var(--mantine-color-gray-1)"
          size="xs"
          style={{ color: "black" }}
          onClick={close}
        >
          Cancel
        </Button>
        <Button
          loading={loading}
          onClick={onConfirm}
          size="xs"
          color="var(--mantine-color-music-7)"
        >
          {button.btn}
        </Button>
      </Flex>
    </Modal>
  );
};

export default ConfirmData;
