import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import NbaProjService from '../../services/nbaproj.service';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Values {
  teamName: string;
  city: string;
  abbreviation: string;
}

interface ActionModalProps {
  myTeams: any;
  onCreateMyTeam: any;
}

const ActionModal = ({ myTeams, onCreateMyTeam }: ActionModalProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ marginBottom: '50px' }}>
      <Button onClick={handleOpen} variant="contained">Create My Team</Button>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <div>
              <h1>Create Team</h1>
              <Formik
                initialValues={{
                  teamName: '',
                  city: '',
                  abbreviation: '',
                }}
                onSubmit={(
                  values: Values,
                  { setSubmitting }: FormikHelpers<Values>
                ) => {
                  NbaProjService.createMyTeam(values)
                    .then((response) => {
                      const newData = [...myTeams, response.data]
                      onCreateMyTeam(newData);
                      toast.success('Team Created Successfully!', {
                        position: toast.POSITION.TOP_RIGHT
                      });

                      handleClose();
                    })
                    .catch((e: Error) => {
                      toast.error('Error While Creating Your Team!', {
                        position: toast.POSITION.TOP_RIGHT
                      });
                      console.log(e);
                    });
                }}
              >
                <Form>
                  <div>
                    <label htmlFor="teamName">Team Name</label>
                    <Field id="teamName" name="teamName" placeholder="Team Name" />
                  </div>

                  <div>
                    <label htmlFor="city">City</label>
                    <Field id="city" name="city" placeholder="City" />
                  </div>

                  <div>
                    <label htmlFor="abbreviation">Abbreviation</label>
                    <Field id="abbreviation" name="abbreviation" placeholder="Abbreviation" />
                  </div>

                  <button type="submit">Submit</button>
                </Form>
              </Formik>
            </div>
          </Box>
        </Modal>
    </div>
  );
}

export default ActionModal;