import { useState } from "react";
import '../App.css'
import {
  createStyles,
  Navbar,
  Box,
  Group,
  Code,
  getStylesRef,
  rem,
  Anchor,
  Text,
  Center,
  Space,
} from "@mantine/core";
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { MantineLogo } from "@mantine/ds";
import Icon from "@mdi/react";
import {
  mdiHomeCircle,
  mdiAccountCircle,
  mdiMap,
  mdiShieldHomeOutline,
} from "@mdi/js";

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  },
}));

const data = [
  { link: "/dashboard", label: "My Dashboard", icon: IconBellRinging },
  { link: "/test", label: "Test", icon: IconReceipt2 },
  { link: "/upload", label: "Upload", icon: IconFingerprint },
  { link: "/", label: "Home", icon: IconKey },
  { link: "/shelterdash", label: "Admin", icon: IconKey },
  { link: "/mtest", label: "ModTest", icon: Icon2fa },
  { link: "", label: "Other Settings", icon: IconSettings },
];

export default function NavbarSimple() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Billing");

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <div>
        <style>
                            @import url('https://fonts.cdnfonts.com/css/retro-craft');
</style>
<style>
                            @import url('https://fonts.cdnfonts.com/css/danson');
</style>
<style>
                            @import url('https://fonts.cdnfonts.com/css/vic');
</style>
<style>
                            @import url('https://fonts.cdnfonts.com/css/reigo');
</style>
                
                
    
    <Navbar height={700} width={{ sm: 220 }} sx={{marginLeft:-10}} p="md">
   
                
      <Navbar.Section grow>
        {}

        <Link className={classes.link}  to="/">
          
            <Center>
              {" "}
              <Icon path={mdiHomeCircle} size={1} />
              <Space w="xs"></Space><Text className='chester'>Home</Text>
            </Center>
          
        </Link>
        <Space h='xl'></Space>
        <Link className={classes.link} to="/dashboard">
         
            <Center>
              <Icon path={mdiAccountCircle} size={1} />
              <Space w="xs"></Space><Text className='chester'>Dashboard</Text>
            </Center>
          
        </Link>
        <Space h='xl'></Space>
        <Link className={classes.link} to="/mappage">
          
            <Center>
              <Icon path={mdiMap} size={1} />
              <Space w="xs"></Space><Text className='chester'>Map</Text>
            </Center>
          
        </Link>

        <Link className={classes.link} to="/shelterdash">
          <Text
            component="span"
            size="sm"
            c="#544179"
            style={{
              fontFamily: "Greycliff CF, sans-serif",
              fontSize: "large",
            }}
          >
            <Center>
              
              <Space w="xs"></Space>
            </Center>
          </Text>
        </Link>
      </Navbar.Section>
    </Navbar>
    </div>
  );
 
}
