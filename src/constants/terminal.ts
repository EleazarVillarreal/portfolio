/**
 * Animation timing for the hero terminal, in milliseconds.
 * Centralized so the terminal's choreography can be tuned in one place.
 */
export const TIMING = {
  /** Delay between each output line popping into view. */
  LINE_REVEAL_MS: 110,
  /** Pause before the intro `whoami` runs on mount. */
  INTRO_DELAY_MS: 500,
  /** Gap between each target in the `rm` deletion sequence. */
  RM_STEP_MS: 520,
  /** Delay after marking a target before its wipe animation starts. */
  RM_MARK_MS: 200,
  /** Wipe animation duration before the target is hidden. */
  RM_DELETE_MS: 540,
  /** Pause after the sequence finishes before the void overlay appears. */
  RM_VOID_DELAY_MS: 350,
} as const
