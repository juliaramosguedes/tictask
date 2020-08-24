import React, { useState, useCallback } from 'react';
import { BsPencil } from 'react-icons/bs';
import { Button, Container, Input, Separator, Subtitle } from '../../ui';

export default ({ color, ...props }) => {
  const [showEdit, setShowEdit] = useState(false);

  const onEditClick = useCallback(() => {
    setShowEdit(true);
  }, []);

  const onSaveClick = useCallback(() => {
    setShowEdit(false);
  }, []);

  return (
    <Container display="flex" direction="column">
      {showEdit ? (
        <>
          <Separator transparent size={8} />
          <Subtitle color={color} size={2} center weight="bold">
            Personalizar duração
            <br />
            em minutos
          </Subtitle>
          <Separator transparent size={4} />
          <Input id="set-focus" color={color} label="Foco" type="number" />
          <Separator transparent size={4} />
          <Input
            id="set-short-break"
            color={color}
            label="Intervalo curto"
            type="number"
          />
          <Separator transparent size={4} />
          <Input
            id="set-long-break"
            color={color}
            label="Intervalo longo"
            type="number"
          />
          <Separator transparent size={8} />
          <Button.Main
            border
            borderColor="#fff"
            onClick={onSaveClick}
            padding="8px 48px"
          >
            <p>SALVAR</p>
          </Button.Main>
        </>
      ) : (
        <Button.Main transparent flex color={color} onClick={onEditClick}>
          <BsPencil color={color} />
          <p>Personalizar duração</p>
        </Button.Main>
      )}
    </Container>
  );
};
