"use client";

import React, { forwardRef } from "react";
import {
  ColorPicker,
  ColorField,
  ColorInput,
  ColorLabel,
  ColorArea,
  ColorSlider,
  SliderTrack,
  ColorThumb,
  ColorSwatchPicker,
  ColorSwatchPickerItem,
  ColorSwatch,
  EyeDropperButton,
  ColorError,
  ColorGroup,
} from "@/components/ui/ColorPicker/color-picker";
import { parseColor, Color } from "react-aria-components";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface ColorPickerWithPresetsProps {
  control: {
    id: string;
    label: string;
    description?: string;
    error?: string;
  };
  value: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  presets?: string[];
  showEyeDropper?: boolean;
  showInput?: boolean;
  className?: string;
  size?: "sm" | "default" | "lg";
}

// Default preset colors
const defaultPresets = [
  "#000000", // Black
  "#ffffff", // White
  "#ff0000", // Red
  "#00ff00", // Green
  "#0000ff", // Blue
  "#ffff00", // Yellow
  "#ff00ff", // Magenta
];

// ColorPickerWithPresetsForm component
export const ColorPickerWithPresetsForm = forwardRef<
  HTMLInputElement,
  ColorPickerWithPresetsProps
>(
  (
    {
      control,
      value,
      defaultValue = "#000000",
      onChange,
      presets = defaultPresets,
      showEyeDropper = true,
      showInput = true,
      className,
      size = "default",
    },
    ref
  ) => {
    // Initialize color state with error handling
    const [colorValue, setColorValue] = React.useState<Color>(() => {
      try {
        return value ? parseColor(value) : parseColor(defaultValue);
      } catch {
        console.warn(
          `Invalid color value: ${value || defaultValue}. Falling back to default.`
        );
        return parseColor(defaultValue);
      }
    });

    // Sync color state with controlled value prop
    React.useEffect(() => {
      if (value) {
        try {
          setColorValue(parseColor(value));
        } catch {
          console.warn(`Invalid color value: ${value}. Keeping current color.`);
        }
      }
    }, [value]);

    // Handle color changes
    const handleColorChange = React.useCallback(
      (color: Color) => {
        setColorValue(color);
        onChange?.(color.toString("hex"));
      },
      [onChange]
    );

    // Memoize preset swatches for performance
    const presetSwatches = React.useMemo(
      () =>
        presets
          .map((preset) => {
            try {
              return (
                <ColorSwatchPickerItem key={preset} color={parseColor(preset)}>
                  <ColorSwatch />
                </ColorSwatchPickerItem>
              );
            } catch {
              console.warn(`Invalid preset color: ${preset}. Skipping.`);
              return null;
            }
          })
          .filter(Boolean),
      [presets]
    );

    // Check for EyeDropper API support
    const isEyeDropperSupported =
      typeof window !== "undefined" && "EyeDropper" in window;

    return (
      <Card className="p-4">
        <div className="space-y-2">
          {/* Form Label and Description */}
          <Label
            htmlFor={control.id}
            className="text-lg font-semibold text-primary"
          >
            {control.label}
          </Label>
          {control.description && (
            <p className="text-sm text-muted-foreground">
              {control.description}
            </p>
          )}

          {/* Color Picker */}
          <ColorPicker
            value={colorValue}
            onChange={handleColorChange}
            size={size}
            className={className}
          >
            <div className="space-y-4">
              {/* Saturation and Brightness Area */}
              <ColorArea
                colorSpace="hsb"
                xChannel="saturation"
                yChannel="brightness"
              >
                <ColorThumb />
              </ColorArea>

              {/* Hue Slider */}
              <ColorSlider colorSpace="hsb" channel="hue">
                <SliderTrack>
                  <ColorThumb />
                </SliderTrack>
              </ColorSlider>

              {/* Alpha (Opacity) Slider */}
              <ColorSlider colorSpace="hsb" channel="alpha">
                <SliderTrack>
                  <ColorThumb />
                </SliderTrack>
              </ColorSlider>

              {/* Hex Input and Eye Dropper */}
              {showInput && (
                <ColorField>
                  <ColorLabel>Hex Color</ColorLabel>
                  <ColorGroup className="flex gap-2">
                    <ColorInput ref={ref} />
                    {showEyeDropper && isEyeDropperSupported && (
                      <EyeDropperButton />
                    )}
                  </ColorGroup>
                  {control.error && <ColorError>{control.error}</ColorError>}
                </ColorField>
              )}

              {/* Preset Colors */}
              {presets.length > 0 && (
                <div className="space-y-2">
                  <ColorLabel>Presets</ColorLabel>
                  <ColorSwatchPicker>{presetSwatches}</ColorSwatchPicker>
                </div>
              )}
            </div>
          </ColorPicker>
        </div>
      </Card>
    );
  }
);

ColorPickerWithPresetsForm.displayName = "ColorPickerWithPresetsForm";
