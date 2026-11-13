// Remotion's settings for this film: where the compositions are registered,
// and how frames are captured and encoded.
import { Config } from '@remotion/cli/config'

Config.setEntryPoint('./src/index.ts')

// Capture frames as PNG, not JPEG: the film is flat fills and hard ink
// lines, which JPEG smears before the video encoder ever sees them.
Config.setVideoImageFormat('png')

// Tag the video as BT.709 so the theme colours come out as written.
Config.setColorSpace('bt709')

Config.setOverwriteOutput(true)
