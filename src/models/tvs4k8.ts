import { generateOutputs, type ModelSpec } from './types.js'
import { Enums } from 'atem-connection'
import {
	AUDIO_ROUTING_SOURCE_NO_AUDIO,
	generateInputRoutingSources,
	AUDIO_ROUTING_SOURCE_XLR,
	AUDIO_ROUTING_SOURCE_RCA,
	AUDIO_ROUTING_SOURCE_MICROPHONE,
	generateMadiRoutingSources,
	generateMediaPlayerRoutingSources,
	generateTalkbackRoutingSources,
	AUDIO_ROUTING_SOURCE_MONITOR,
	AUDIO_ROUTING_SOURCE_PROGRAM,
	AUDIO_ROUTING_SOURCE_CONTROL,
	AUDIO_ROUTING_SOURCE_STUDIO,
	AUDIO_ROUTING_SOURCE_HEADPHONES,
	AUDIO_ROUTING_OUTPUT_PROGRAM,
	generateAuxRoutingOutputs,
	generateMadiRoutingOutputs,
	AUDIO_ROUTING_OUTPUT_MULTIVIEWER,
	generateMixMinusRoutingSources,
} from './util/audioRouting.js'
import {
	AUDIO_FAIRLIGHT_INPUT_RCA,
	AUDIO_FAIRLIGHT_INPUT_TS_JACK,
	AUDIO_FAIRLIGHT_INPUT_XLR,
	generateFairlightInputMadi,
	generateFairlightInputMediaPlayer,
	generateFairlightInputsOfType,
} from './util/fairlight.js'
import { VideoInputGenerator } from './util/videoInput.js'

export const ModelSpecTVS4K8: ModelSpec = {
	id: Enums.Model.TelevisionStudio4K8,
	label: 'Television Studio 4K8',
	inputs: VideoInputGenerator.begin({
		meCount: 1,
		baseSourceAvailability:
			Enums.SourceAvailability.Auxiliary |
			Enums.SourceAvailability.Multiviewer |
			Enums.SourceAvailability.SuperSourceBox |
			Enums.SourceAvailability.SuperSourceArt,
	})
		.addInternalColorsAndBlack()
		.addExternalInputs(8)
		.addMediaPlayers(2)
		.addCleanFeeds(2)
		.addAuxiliaryOutputs(10)
		.addProgramPreview()
		.addSuperSource()
		.addMultiviewers(1)
		.addMultiviewerStatusSources()
		.generate(),
	outputs: generateOutputs('Output', 10),
	MEs: 1,
	USKs: 4,
	DSKs: 2,
	MVs: 1,
	multiviewerFullGrid: true,
	DVEs: 1,
	SSrc: 1,
	macros: 100,
	displayClock: 1,
	media: {
		players: 2,
		stills: 20,
		clips: 2,
		captureStills: true,
	},
	streaming: true,
	recording: true,
	recordISO: false,
	fairlightAudio: {
		monitor: 'split',
		audioRouting: {
			sources: [
				AUDIO_ROUTING_SOURCE_NO_AUDIO,
				...generateInputRoutingSources(8, true),
				AUDIO_ROUTING_SOURCE_XLR,
				AUDIO_ROUTING_SOURCE_RCA,
				AUDIO_ROUTING_SOURCE_MICROPHONE,
				...generateMadiRoutingSources(16),
				...generateMediaPlayerRoutingSources(2),
				...generateTalkbackRoutingSources(true, true),
				AUDIO_ROUTING_SOURCE_MONITOR,
				AUDIO_ROUTING_SOURCE_PROGRAM,
				AUDIO_ROUTING_SOURCE_CONTROL,
				AUDIO_ROUTING_SOURCE_STUDIO,
				AUDIO_ROUTING_SOURCE_HEADPHONES,
				...generateMixMinusRoutingSources(8),
			],
			outputs: [
				...generateMadiRoutingOutputs(32),
				...generateAuxRoutingOutputs(10),
				AUDIO_ROUTING_OUTPUT_MULTIVIEWER,
				AUDIO_ROUTING_OUTPUT_PROGRAM,
			],
		},
		inputs: [
			...generateFairlightInputsOfType(1, 8, Enums.ExternalPortType.SDI),
			AUDIO_FAIRLIGHT_INPUT_XLR,
			AUDIO_FAIRLIGHT_INPUT_RCA,
			AUDIO_FAIRLIGHT_INPUT_TS_JACK,
			...generateFairlightInputMadi(16),
			...generateFairlightInputMediaPlayer(2),
		],
	},
}
