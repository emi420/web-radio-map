import { useEffect, useState } from "react";
import { Header } from '@hotosm/ui/dist/react';
import { useLocation, useNavigate } from 'react-router-dom'

const tabsPath = {
    "/": 0,
    "/send": 1,
}

const NavHeader = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        setSelectedTab(tabsPath[location.pathname]);
    }, [location, selectedTab])

    const tabs = [
        {
            label: 'Receive',
            clickEvent: async () => {
                navigate("/");
            }
        },
        {
            label: 'Send',
            clickEvent: async () => {
                navigate("/send");
            }
        }
    ];

    return (
        <Header
            tabs={tabs}
            selectedTab={selectedTab}
            title={"Radio Map"}
            logo="/logo.svg"
        />
    )
}

export default NavHeader;
