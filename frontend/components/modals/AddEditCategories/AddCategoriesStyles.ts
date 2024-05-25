import { styled } from "@mui/material";


export const style = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 4,
    px: 2,
    py: 3,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
}

export const StyledDiv = styled('div')({
    display: 'flex',
    flexDirection: 'column',
});

export const StyledLabel = styled('label')({
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontWeight: 'lighter',
    fontSize: "18px",
    color: '#7D8395',
});

