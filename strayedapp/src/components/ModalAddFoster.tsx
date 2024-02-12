import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button } from '@mantine/core';
import Upload from './Upload'
import {IconExternalLink} from '@tabler/icons-react'
export default function ModelAddFoster() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication" centered>
        {<Upload/>}
      </Modal>

      <Group position="center">
      <Button size="sm" c="#544179" variant="white" onClick={open} leftIcon={<IconExternalLink size="0.9rem" />} >
      Add Foster
    </Button>
      </Group>
    </>
  )
}