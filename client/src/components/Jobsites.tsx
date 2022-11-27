import { Badge, Box, Flex, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { SitesContext } from '../context/Context';

const Jobsites = ({ activeSite, setActiveSite }: any) => {
  const { jobSites } = useContext(SitesContext);
  return (
    <>
      <Box
        w='full'
        py={3}
        bg='white'
        _dark={{
          bg: 'gray.700',
        }}
        mb='0.9rem'
        px={{ base: 4, md: 3, xl: 4 }}
        shadow='sm'
        rounded='md'
        className='sidebarCard'
      >
        <Box
          fontSize='md'
          fontWeight='bold'
          fontFamily="'Overpass', sans-serif"
          color='gray.700'
          _dark={{
            color: 'gray.50',
          }}
          mb='0.5rem'
        >
          <i className='fa-solid fa-link'></i> Job Sites
        </Box>
        {jobSites && jobSites.length === 0 ? (
          <Box fontStyle='italic' fontSize='0.85rem'>
            You haven't added any jobs yet.
          </Box>
        ) : (
          <Flex flexWrap='wrap'>
            {jobSites &&
              jobSites.map((site: any, i: any) => {
                return (
                  <Box key={i}>
                    <Box
                      mr='1.7rem'
                      whiteSpace={'nowrap'}
                      color={activeSite === site._id ? 'gray.700' : 'gray.600'}
                      _dark={{
                        color: activeSite === site._id ? 'gray.50' : 'gray.300',
                      }}
                      fontSize='0.97rem'
                      display='flex'
                      alignItems='center'
                    >
                      <Box fontSize='0.5rem' mr='0.2rem'>
                        {activeSite === site._id ? (
                          <i className='fa-solid fa-check-double'></i>
                        ) : (
                          <i className='fa-solid fa-angles-right'></i>
                        )}
                      </Box>{' '}
                      <Box
                        mr='0.2rem'
                        pb='0.15rem'
                        _hover={{
                          color: 'gray.700',
                          _dark: { color: 'gray.50' },
                        }}
                        cursor='pointer'
                        onClick={() =>
                          setActiveSite(activeSite === site._id ? '' : site._id)
                        }
                      >
                        {site._id}{' '}
                      </Box>
                      <Badge
                        colorScheme='linkedin'
                        fontWeight='400'
                        fontSize='0.7rem'
                        rounded='50%'
                      >
                        {site.count}
                      </Badge>
                    </Box>
                  </Box>
                );
              })}
          </Flex>
        )}
      </Box>
    </>
  );
};

export default Jobsites;
