import React, { useState, useEffect } from 'react';
import { Menu } from 'semantic-ui-react';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

const Header = () => {

    const [activeItem, setActiveItem] = useState('')
    const router = useRouter();
    const handleItemClick = (event, menuItem) => {
        console.log(event.target);
        console.log(menuItem.name);
        router.push("/campaigns/new");
    }
    return (
        <Menu style = {{marginTop : '10px' }}>
            <Link href = "/"> 
            <Menu.Item
                name='CrowdCoin'
                active={activeItem === 'CrowdCoin'}
            >
                CrowdCoin
            </Menu.Item>
            </Link>
            
            <Menu.Menu position='right'>
                <Menu.Item
                    name='Campaigns'
                    active={activeItem === 'Campaigns'}
                >
                    Campaigns
                </Menu.Item>
                <Link href = "/campaigns/new"> 
                <Menu.Item
                    name='plus'
                    active={activeItem === 'plus'}
                >
                    +
                </Menu.Item>
                </Link>
            </Menu.Menu>
        </Menu>
    )
}

export default Header