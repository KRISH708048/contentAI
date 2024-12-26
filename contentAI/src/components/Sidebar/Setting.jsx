import React, { useState } from "react";
import { Slider, TextField, Button, Typography, Box, Grid } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { generationConfigAtom } from "../../store/atoms/settingsAtom";
import { userAtom } from "../../store/atoms/authAtom";

const Settings = () => {
  const [generationConfig, setGenerationConfig] = useRecoilState(generationConfigAtom);
  const userData = useRecoilValue(userAtom);
  const handleSliderChange = (event, newValue, key) => {
    setGenerationConfig((prevConfig) => ({
      ...prevConfig,
      [key]: newValue,
    }));
  };

  const handleInputChange = (event, key) => {
    const value = key === "maxOutputTokens" ? parseInt(event.target.value) : event.target.value;
    setGenerationConfig((prevConfig) => ({
      ...prevConfig,
      [key]: value,
    }));
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Generation Configuration Settings
      </Typography>
      
      <Grid container spacing={3}>
        {/* Temperature Slider */}
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Temperature</Typography>
          <Slider
            value={generationConfig.temperature}
            min={0}
            max={2}
            step={0.1}
            onChange={(e, val) => handleSliderChange(e, val, "temperature")}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}`}
            aria-labelledby="temperature-slider"
          />
        </Grid>

        {/* Top P Slider */}
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Top P</Typography>
          <Slider
            value={generationConfig.topP}
            min={0}
            max={1}
            step={0.05}
            onChange={(e, val) => handleSliderChange(e, val, "topP")}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}`}
            aria-labelledby="topP-slider"
          />
        </Grid>

        {/* Top K Slider */}
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Top K</Typography>
          <Slider
            value={generationConfig.topK}
            min={0}
            max={100}
            step={1}
            onChange={(e, val) => handleSliderChange(e, val, "topK")}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}`}
            aria-labelledby="topK-slider"
          />
        </Grid>

        {/* Max Output Tokens */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Max Output Tokens"
            value={generationConfig.maxOutputTokens}
            onChange={(e) => handleInputChange(e, "maxOutputTokens")}
            type="number"
            fullWidth
            inputProps={{ min: 1 }}
          />
        </Grid>

        {/* Response MIME Type */}
        <Grid item xs={12}>
          <TextField
            label="Response MIME Type"
            value={generationConfig.responseMimeType}
            onChange={(e) => handleInputChange(e, "responseMimeType")}
            fullWidth
          />
        </Grid>

        {/* Save Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => alert("Configuration Saved!")}
            fullWidth
            disabled={!userData}
          >
            Save Configuration
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
