import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button,Text } from '@mantine/core';
import Upload from './Upload'
import '../css/petList.css'
import Icon from '@mdi/react';
import { mdiHomePlus } from '@mdi/js';
import { IconExternalLink } from '@tabler/icons-react';

export default function ModelAddPet() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal onSubmit={close} className='modalAddPet'  styles={{close:{color: 'white', backgroundColor:'black'}, header: { backgroundImage: 'url(images/diamond-sunset.svg)' }}}opened={opened} onClose={close} title="" centered>
    

        {<Upload/>}
      </Modal>

      <Group position="center">
      <Button size="sm"  c="#544179" variant="white" onClick={open} leftIcon={<IconExternalLink size="0.9rem" />} >
     Add Dog
    </Button>
      </Group>
    </>
  );
}