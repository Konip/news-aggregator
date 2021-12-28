import { Box, Skeleton } from '@mui/material';
import React from 'react';
export default function Skeletons() {
    return (
        <Box sx={{ pt: 0.5, m: 1, backgroundColor: 'white', borderRadius: '9px', paddingBottom: '50px' }}>
        <Skeleton
            sx={{ backgroundColor: 'inherit' }}
            variant="rectangular"
            width={410}
            height={390}

        />
        <Skeleton
            width="90%"
            sx={{ ml: '20px' }}

        />
        <Skeleton
            width="60%"
            sx={{ ml: '20px' }}
        />
    </Box>
    )
}
