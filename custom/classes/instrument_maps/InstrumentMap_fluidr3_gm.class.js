// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%% InstrumentMap_fluidr3_gm Class %%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// Simply provides an instrument map for the fluidr3_tm 
// midi instrument set.  These were named by hand after 
// examination.

// instrument map
class InstrumentMap_fluidr3_gm
{

    // class constructor
    constructor(params)
    {

        // These are all defined manually for each instrument set.
        this.insts = {};
        this.insts["deep_piano"]                                                 = 0;
		this.insts["deep_metallic_piano"]                                        = 1;
		this.insts["twangy_bass_guitar"]                                         = 2;
		this.insts["metallic_bass_organ"]                                        = 3;
		this.insts["synth_organ"]                                                = 4;
		this.insts["deep_muffled_bass_guitar"]                                   = 5;
		this.insts["deep_harpsichord"]                                           = 6;
		this.insts["light_twangy_bass_guitar"]                                   = 7;
		this.insts["muffled_jungle_bongo_drum"]                                  = 8;
		this.insts["techno_muffled_bells"]                                       = 9;
		this.insts["techno_highpitch_bells"]                                     = 10;
		this.insts["techno_bongo_bells"]                                         = 11;
		this.insts["techno_low_bells"]                                           = 12;
		this.insts["techno_flat_bells_tock_drums"]                               = 13;
		this.insts["techno_muffled_metallic"]                                    = 14;
		this.insts["techno_bass_metallic"]                                       = 15;
		this.insts["deep_muffled_bass_guitar"]                                   = 16;
		this.insts["clunkhoof_drum_and_sometimes_organ"]                         = 17;
		this.insts["muffled_organ"]                                              = 18;
		this.insts["church_pipe_organ"]                                          = 19;
		this.insts["muffled_flumey_organ"]                                       = 20;
		this.insts["bassoon_horn"]                                               = 21;
		this.insts["digital_shortwonk_horn"]                                     = 22;
		this.insts["digital_longwonk_horn"]                                      = 23;
		this.insts["clean_reverb_bass_guitar"]                                   = 24;
		this.insts["clean_metallic_bass_guitar"]                                 = 25;
		this.insts["funky_clean_bass_guitar"]                                    = 26;
		this.insts["muffled_dirty_bass_guitar"]                                  = 27;
		this.insts["slap_clean_bass_guitar"]                                     = 28;
		this.insts["techno_heeoo_unknown"]                                       = 29;
		this.insts["techno_heeoo_distortion_unknown"]                            = 30;
		this.insts["heavy_80s_metal_guitar"]                                     = 31;
		this.insts["classic_upright_bass_guitar"]                                = 32;
		this.insts["medium_muffled_bass_guitar"]                                 = 33;
		this.insts["twangy_bass_guitar"]                                         = 34;
		this.insts["synth_bass_guitar"]                                          = 35;
		this.insts["twangy_slappy_bass_guitar"]                                  = 36;
		this.insts["hard_twangy_slappy_bass_guitar"]                             = 37;
		this.insts["synth_buzzy_bass"]                                           = 38;
		this.insts["synth_soft_bass"]                                            = 39;
		this.insts["synth_breathy_exhale_bass"]                                  = 40;
		this.insts["beautiful_violin_and_bass_at_lower_end"]                     = 41;
		this.insts["synth_violin_muffled_hornish_bass"]                          = 42;
		this.insts["synth_clean_hornish_bass"]                                   = 43;
		this.insts["synth_reverb_hornish_bass"]                                  = 44;
		this.insts["synth_haunting_deep_bass"]                                   = 45;
		this.insts["synth_breathy_pong_bass"]                                    = 46;
		this.insts["heavy_reverb_kick_drum"]                                     = 47;
		this.insts["synth_bass_organ"]                                           = 48;
		this.insts["synth_pausing_bass_organ"]                                   = 49;
		this.insts["synth_humming_bass_organ"]                                   = 50;
		this.insts["synth_wah_bass_organ"]                                       = 51;
		this.insts["chanting_vocal"]                                             = 52;
		this.insts["very_deep_muffled_organ"]                                    = 53;
		this.insts["weird_breathy_organ"]                                        = 54;
		this.insts["walls_are_falling_drum"]                                     = 55;
		this.insts["funny_wonk_mid_horn"]                                        = 56;
		this.insts["funny_wonk_high_horn"]                                       = 57;
		this.insts["clean_low_organ"]                                            = 58;
		this.insts["wonk_high_horn_organ"]                                       = 59;
		this.insts["wonk_high_horn_bass"]                                        = 60;
		this.insts["strong_horn_bass"]                                           = 61;
		this.insts["synth_horn_bass"]                                            = 62;
		this.insts["synth_upward_inflecting_horn_bass"]                          = 63;
		this.insts["synth_mid_horn_bass"]                                        = 63;
		this.insts["synth_high_horn_bass"]                                       = 64;
		this.insts["synth_low_horn_bass"]                                        = 65;
		this.insts["synth_duckquack_bass"]                                       = 66;
		this.insts["synth_twangy_horn_bass"]                                     = 67;
		this.insts["synth_breathy_horn_bass"]                                    = 68;
		this.insts["woh_horn_bass"]                                              = 69;
		this.insts["oohgg_horn_bass"]                                            = 70;
		this.insts["oboe_deep_wind"]                                             = 71;
		this.insts["soft_push_wind"]                                             = 72;
		this.insts["soft_pull_wind"]                                             = 73;
		this.insts["humming_glasses_wind"]                                       = 74;
		this.insts["soft_weird_wind"]                                            = 75;
		this.insts["mid_push_wind"]                                              = 76;
		this.insts["low_wingflap_wind"]                                          = 77;
		this.insts["low_rum_jug_wind"]                                           = 78;
		this.insts["synth_low_rum_jug_wind"]                                     = 79;
		this.insts["synth_techno_punchy_organ"]                                  = 80;
		this.insts["synth_techno_punchy_guitar"]                                 = 81;
		this.insts["synth_techno_punchy_bass"]                                   = 82;
		this.insts["synth_techno_punchy_horn"]                                   = 83;
		this.insts["synth_buzzy_bee_rattle"]                                     = 84;
		this.insts["low_breathy_rum_jug_wind"]                                   = 85;
		this.insts["synth_heavy_distorted_guitar"]                               = 86;
		this.insts["synth_heavy_buzzy_bass"]                                     = 87;
		this.insts["synth_glass_reverb_bass"]                                    = 88;
		this.insts["low_volume_background_bass"]                                 = 89;
		this.insts["low_volume_synth_glass_reverb_bass"]                         = 90;
		this.insts["synth_jug_glass_reverb_bass"]                                = 91;
		this.insts["synth_glass_bells"]                                          = 92;
		this.insts["mid_volume_synth_sheetmetal_reverb_bass"]                    = 93;
		this.insts["low_volume_synth_sheetmetal_reverb_bass"]                    = 94;
		this.insts["very_low_volume_synth_reverb_bass"]                          = 95;
		this.insts["xylophone_rattling_low_very_cool_bass"]                      = 96;
		this.insts["metroid_overworld_organ"]                                    = 97;
		this.insts["synth_videogame_humming_organ"]                              = 98;
		this.insts["harp_bass_guitar"]                                           = 99;
		this.insts["weird_metal_wohh_bass"]                                      = 100;
		this.insts["weird_breathy_glass_wohh_bass"]                              = 101;
		this.insts["chanting_haah_bass_vocal"]                                   = 102;
		this.insts["normal_low_reverb_bass"]                                     = 103;
		this.insts["indian_reverb_twangy_instrument"]                            = 104;
		this.insts["palm_muted_bass_guitar"]                                     = 105;
		this.insts["palm_muted_with_percussion_tap_bass_guitar"]                 = 106;
		this.insts["synth_tocktwang_organ"]                                      = 107;
		this.insts["tock_reverb_drums"]                                          = 108;
		this.insts["synth_high_clean_organ"]                                     = 109;
		this.insts["synth_low_dirty_breathy_organ"]                              = 110;
		this.insts["synth_mid_horn"]                                             = 111;
		this.insts["synth_reverb_bell_horn"]                                     = 112;
		this.insts["full_drums_with_cymbals"]                                    = 113;
		this.insts["synth_glass_echo_organ"]                                     = 114;
		this.insts["clean_tock_drums"]                                           = 115;
		this.insts["heavy_huge_drums"]                                           = 116;
		this.insts["tomtom_clean_drums"]                                         = 117;
		this.insts["bass_kick_dirty_drums"]                                      = 118;
		this.insts["reverse_cymbal_drums"]                                       = 119;
		this.insts["synth_reverse_screech_wheelish_seagull"]                     = 120;
		this.insts["synth_spooky_exhale"]                                        = 121;
		this.insts["synth_waves_washing_on_shore"]                               = 122;
		this.insts["synth_birds_whistling"]                                      = 123;
		this.insts["synth_phones_ringing"]                                       = 124;
		this.insts["synth_helicopter_drums"]                                     = 125;
		this.insts["synth_sandpaper_washing"]                                    = 126;
		this.insts["heavy_nine_inch_nails_distorted_drum"]                       = 127;
		this.insts["clean_with_a_bit_of_twang_bass_guitar"]                      = 128;
		this.insts["clean_with_a_bit_of_hammer_bass_guitar"]                     = 129;
		this.insts["clean_with_a_bit_of_back_slap_bass_guitar"]                  = 130;
		this.insts["clean_with_a_bit_of_hammer_bass_organ"]                      = 131;
		this.insts["synth_digital_sounding_bass_organ"]                          = 132;
		this.insts["punchy_hammer_bass_organ"]                                   = 133;
		this.insts["punchy_harpsichord_organ"]                                   = 134;
		this.insts["clean_muted_slap_bass_guitar"]                               = 135;
		this.insts["muted_bongo_drums"]                                          = 136;
		this.insts["aphex_twin_haunting_mid_bong_triangle"]                      = 137;
		this.insts["aphex_twin_haunting_high_bong_triangle"]                     = 138;
		this.insts["aphex_twin_haunting_low_bong_triangle"]                      = 139;
		this.insts["aphex_twin_haunting_very_low_bong_triangle"]                 = 140;
		this.insts["low_slap_bongo_drums"]                                       = 141;
		this.insts["metal_triangle_and_cymbals"]                                 = 142;
		this.insts["metallic_come_as_you_are_heavy_nirvana_bass"]                = 143;
		this.insts["generic_very_low_bass"]                                      = 144;
		this.insts["percussive_conk_low_bass"]                                   = 145;
		this.insts["percussive_horn_low_bass"]                                   = 146;
		this.insts["loud_clean_punchy_church_organ"]                             = 147;
		this.insts["oboe_deep_low_wind"]                                         = 148;
		this.insts["oboe_deep_mid_wind"]                                         = 149;
		this.insts["ducky_upward_mid_inflection_horn"]                           = 150;
		this.insts["ducky_upward_low_inflection_horn"]                           = 151;
		this.insts["clean_mid_reverb_bass_guitar"]                               = 152;
		this.insts["clean_loud_reverb_bass_guitar"]                              = 153;
		this.insts["punchy_loud_no_reverb_bass_guitar"]                          = 154;
		this.insts["drone_twang_bass_guitar"]                                    = 155;
		this.insts["very_nice_slap_palm_muted_bass_guitar"]                      = 156;
		this.insts["synth_heeee_breath_weird_bass"]                              = 157;
		this.insts["synth_heeee_breath_weird_distorted_bass"]                    = 158;
		this.insts["heavy_metal_screech_electric_guitar"]                        = 159;
		this.insts["bongo_upgright_palm_muted_bass_guitar"]                      = 160;
		this.insts["bong_bong_muted_bass_guitar"]                                = 161;
		this.insts["bong_bong_bass_guitar"]                                      = 162;
		this.insts["brumbrum_bass_guitar"]                                       = 163;
		this.insts["slap_twang_high_energy_bass_guitar"]                         = 164;
		this.insts["slap_twang_very_high_energy_bass_guitar"]                    = 165;
		this.insts["synth_buzzy_techno_bass"]                                    = 166;
		this.insts["synth_heavy_smooth_techno_bass"]                             = 167;
		this.insts["synth_heavy_smooth_wind"]                                    = 168;
		this.insts["synth_heavy_groan_wind"]                                     = 169;
		this.insts["synth_low_volume_heavy_groan_wind"]                          = 170;
		this.insts["wonwonguh_horn_kinda_bass"]                                  = 171;
		this.insts["wonwonguh_low_horn_kinda_bass"]                              = 172;
		this.insts["very_low_percussive_bass"]                                   = 173;
		this.insts["high_percussive_bass"]                                       = 174;
		this.insts["giant_deep_awesome_sounding_drum"]                           = 175;
		this.insts["wonwonguh_mid_horn_kinda_bass"]                              = 176;
		this.insts["wonwonguh_midlow_horn_kinda_bass"]                           = 177;
		this.insts["synth_light_buzzy_techno_bass"]                              = 178;
		this.insts["synth_very_light_buzzy_techno_bass"]                         = 179;
		this.insts["low_church_chanting_vocals"]                                 = 180;
		this.insts["synth_very_low_bass"]                                        = 181;
		this.insts["synth_very_low_weird_upward_bass"]                           = 182;
		this.insts["destructive_almost_gun_fire_bangwhoosh"]                     = 183;
		this.insts["synth_mid_pushy_horn"]                                       = 184;
		this.insts["synth_midhigh_pushy_horn"]                                   = 185;
		this.insts["synth_low_smooth_horn"]                                      = 186;
		this.insts["synth_high_ducky_horn"]                                      = 187;
		this.insts["high_punchy_upward_inflection_horn"]                         = 188;
		this.insts["mid_honky_punchy_upward_inflection_horn"]                    = 189;
		this.insts["synth_vaporwave_mid_horn"]                                   = 190;
		this.insts["synth_punchy_mid_horn"]                                      = 191;
		this.insts["synth_punchy_honky_mid_horn"]                                = 192;
		this.insts["synth_droning_mid_horn"]                                     = 193;
		this.insts["synth_punchy_droning_mid_horn"]                              = 194;
		this.insts["synth_buzzy_droning_mid_horn"]                               = 195;
		this.insts["synth_muffled_clean_droning_mid_horn"]                       = 196;
		this.insts["honk_honk_horn"]                                             = 197;
		this.insts["honk_honk_buzzy_horn"]                                       = 198;
		this.insts["oboe_low_windy_horn"]                                        = 199;
		this.insts["oboe_extremely_low_windy_horn"]                              = 200;
		this.insts["extremely_low_windy_horn"]                                   = 201;
		this.insts["warbly_low_windy_horn"]                                      = 202;
		this.insts["wafty_low_windy_horn"]                                       = 203;
		this.insts["wafty_empty_jug_wind"]                                       = 204;
		this.insts["wafty_wooshing_wind"]                                        = 205;
		this.insts["wafty_jug_rubbing_wind"]                                     = 206;
		this.insts["discordant_wooshing_wind"]                                   = 207;
		this.insts["synth_techno_nice_keyboard"]                                 = 208;
		this.insts["synth_heavy_very_crunchy_keyboard"]                          = 209;
		this.insts["heavy_punchy_haunting_bass"]                                 = 210;
		this.insts["mid_punchy_haunting_bass"]                                   = 211;
		this.insts["synth_buzzy_high_gain_bass"]                                 = 212;
		this.insts["mid_windy_haunting_bass"]                                    = 213;
		this.insts["synth_low_very_very_crunchy_high_gain_bass"]                 = 214;
		this.insts["synth_mid_very_very_crunchy_high_gain_bass"]                 = 215;
		this.insts["synth_punchy_glass_low_reverb_bass"]                         = 216;
		this.insts["synth_low_volume_glass_low_reverb_bass"]                     = 217;
		this.insts["synth_low_wooh_wooh_bass"]                                   = 218;
		this.insts["synth_mid_wooh_wooh_bass"]                                   = 219;
		this.insts["pretty_bong_glass_haunting_bells"]                           = 220;
		this.insts["rubbing_glass_bowls_bass"]                                   = 221;
		this.insts["rubbing_steel_drums_bass"]                                   = 222;
		this.insts["spooky_low_volume_bass"]                                     = 223;
		this.insts["taptap_percussion_and_simultaneous_track_bass"]              = 224;
		this.insts["metroid_underworld_sounding_bass"]                           = 225;
		this.insts["mid_buzzing_humming_bass"]                                   = 226;
		this.insts["bonging_slap_bass_with_no_slap_sound_bass"]                  = 227;
		this.insts["metroid_like_haunting_resonating_bass"]                      = 228;
		this.insts["discordant_glass_haunting_bass"]                             = 229;
		this.insts["metroid_overworld_haunting_chantlike_vocals"]                = 230;
		this.insts["bonging_slap_bass"]                                          = 231;
		this.insts["bonging_metal_hum_bass"]                                     = 232;
		this.insts["bonging_banjo_sounding_bass"]                                = 233;
		this.insts["ticking_percussion_every_other_note_with_clean_bass_guitar"] = 234;
		this.insts["mid_string_with_higher_pitch_bass_guitar"]                   = 235;
		this.insts["jungle_village_click_drums"]                                 = 236;
		this.insts["synth_droning_yuck_bass"]                                    = 237;
		this.insts["synth_droning_yuck_wind"]                                    = 238;
		this.insts["synth_droning_yuck_horn"]                                    = 239;
		this.insts["aphex_twin_droning_bells"]                                   = 240;
		this.insts["jungle_village_bong_drums"]                                  = 241;
		this.insts["synth_warble_jelly_bass"]                                    = 242;
		this.insts["click_cowbell_drums"]                                        = 243;
		this.insts["distorted_heartbeat_low_drums"]                              = 244;
		this.insts["nice_clean_heavy_kick_drums"]                                = 245;
		this.insts["distorted_smooshed_muffled_kick_drums"]                      = 246;
		this.insts["reverse_swish_cymbal"]                                       = 247;
		this.insts["screechy_reverse_seagulls_alarmish_sound"]                   = 248;
		this.insts["straight_swish_windy_sound"]                                 = 249;
		this.insts["waves_washing_high_sound"]                                   = 250;
		this.insts["birds_tweeting_high_sound"]                                  = 251;
		this.insts["phones_ringing_high_sound"]                                  = 252;
		this.insts["helicopter_high_sound"]                                      = 253;
		this.insts["waves_washing_very_high_sound"]                              = 254;
		this.insts["nine_inch_nails_high_drums"]                                 = 255;
    }

    // simply gather the instrument number by name
    getInstrumentNumberByName(instrument_name)
	{
        var inst_map_ref = this;
		return inst_map_ref.insts[instrument_name];
	}
	
}

// export class
try
{
	module.exports.InstrumentMap_fluidr3_gm = InstrumentMap_fluidr3_gm;
} catch(err){}