import React, { useEffect, useState } from "react";
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const Pokemon = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);
  const [spriteUrl, setSpriteUrl] = useState(undefined);

  const [open, setOpen] = React.useState(false);

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_API).then(function (response_url) {
      setSpriteUrl(response_url.data)
      console.log(`${response_url.data.PokemonID}${pokemonId}/`)
      axios
        .get(`${response_url.data.PokemonID}${pokemonId}/`)
        .then(function (response) {
          const { data } = response;
          setPokemon(data);
          setOpen(true);
        })
        .catch(function (error) {
          setPokemon(false);
        });
    });
  }, [pokemonId]);

  const generatePokemonJSX = (pokemon) => {
    const { PokemonSpriteImage } = spriteUrl
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `${PokemonSpriteImage}${id}.png`;
    const { front_default } = sprites;
    console.log(PokemonSpriteImage)
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">Pokemon</DialogTitle>
          <DialogContent>
            <Typography variant="h1">
              {`${id}.`} {name}
              <img src={front_default} />
            </Typography>
            <img
              style={{ width: "300px", height: "300px" }}
              src={fullImageUrl}
            />
            <Typography variant="h3">Pokemon Info</Typography>
            <Typography>
              {"Species: "}
              <Link href={species.url}>{species.name} </Link>
            </Typography>
            <Typography>Height: {height} </Typography>
            <Typography>Weight: {weight} </Typography>
            <Typography variant="h6"> Types:</Typography>
            {types.map((typeInfo) => {
              const { type } = typeInfo;
              const { name } = type;
              return <Typography key={name}> {`${name}`}</Typography>;
            })}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => history.push("/") | handleClose}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  return (
    <div>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
    </div>
  );
};

export default Pokemon;
