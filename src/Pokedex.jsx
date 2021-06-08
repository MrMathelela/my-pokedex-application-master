import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Toolbar,
  AppBar,
  TextField,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  pokemonContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
    boxShadow: "1px 2px 5px rgb(0, 0, 0, 0.3)",
  },
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
  },
  searchContainer: {
    display: "flex",
    backgroundColor: "lightblue",
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px",
    textAlign: "center"
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "200px",
    margin: "5px",
  },
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  labelHeader: {
    backgroundColor: "lightbrown",
    textAlign: "center",
    color: "brown"
  },
}));

const Pokedex = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=100`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];
    return (
      <Grid item xs={2} key={pokemonId}>
        <Card onClick={() => history.push(`/${id}`)}>
          <CardMedia
            className={classes.cardMedia}
            image={sprite}
            style={{ width: "100px", height: "100px" }}
          />
          <CardContent className={classes.cardContent}>
            <Typography
              variant="button"
              display="block"
              fontWeight="fontWeightBold"
              gutterBottom
            >{`${name}`}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <>
          <div>
            <h1 className={classes.labelHeader}>Simon Mathelela PokeDex Application</h1>
          </div>
          <div className={classes.searchContainer}>
            <SearchIcon className={classes.searchIcon} />
            <TextField
              className={classes.searchInput}
              onChange={handleSearchChange}
              label="Pokemon"
              variant="standard"
            />
          </div>

      {pokemonData ? (
        <Grid container spacing={2} className={classes.pokemonContainer}>
          {Object.keys(pokemonData).map(
            (pokemonId) =>
              pokemonData[pokemonId].name.includes(filter) &&
              getPokemonCard(pokemonId)
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Pokedex;
