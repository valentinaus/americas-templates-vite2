import React, { useCallback } from "react";
import {
  Avatar,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Button,
  Icon,
} from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { SettingsIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { LogoutIcon } from "@heroicons/react/solid";
import { logout } from "../../contexts/slices/auth";
const NavBar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logout());
    navigate("");
  };

  return (
    <Flex
      w={"full"}
      h={"3.5rem"}
      bg={"white"}
      pos="fixed"
      zIndex="4"
      boxShadow={"md"}
      px={4}
      // pl={'5rem'}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <NavLink to={"/home"}>
        <Flex w={"9rem"}>
          <Image src={logo} alt="Americas Logo" />
        </Flex>
      </NavLink>

      <Flex justifyContent={"flex-end"} alignItems={"center"}>
        <Menu>
          <MenuButton
            as={Button}
            bg={"white"}
            h={"full"}
            _hover={{
              bg: "brand.gray.extraLight",
            }}
            _active={{
              bg: "brand.gray.extraLight",
            }}
            py={1}
            px={2}
          >
            <HStack>
              <Avatar name={user ? user.fullName : ""} size="sm" />
              <Text
                fontSize={"sm"}
                fontWeight={"semibold"}
                color={"brand.gray.medium"}
                textTransform={"capitalize"}
              >
                {user ? user.fullName : ""}
              </Text>
            </HStack>
          </MenuButton>
          <MenuList fontSize={"sm"} color={"brand.gray.medium"}>
            <MenuItem onClick={logOut}>
              {/* <SettingsIcon w={5} h={5} color={"brand.gray.dark"} mr={2} /> */}
              <Icon
                w={5}
                h={5}
                color={"brand.gray.dark"}
                mr={2}
                as={LogoutIcon}
              />
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};
export default NavBar;
