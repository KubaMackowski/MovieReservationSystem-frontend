
export default async function Home() {
  return (
      <div className="mt-16">
        <h2 className="text-text-main text-3xl font-bold leading-tight tracking-tight px-4 pb-4 pt-5">Now Showing</h2>
        <div className="flex gap-4 p-3 overflow-x-auto">
          <button
              className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl px-5 text-sm font-medium neumorphic-inset bg-primary/20 text-primary">
            All
          </button>
          <button
              className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl px-5 text-sm font-medium neumorphic-outset neumorphic-button-hover neumorphic-button-active transition-all text-text-main bg-background">
            Action
          </button>
          <button
              className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl px-5 text-sm font-medium neumorphic-outset neumorphic-button-hover neumorphic-button-active transition-all text-text-main bg-background">
            Comedy
          </button>
          <button
              className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl px-5 text-sm font-medium neumorphic-outset neumorphic-button-hover neumorphic-button-active transition-all text-text-main bg-background">
            Sci-Fi
          </button>
          <button
              className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl px-5 text-sm font-medium neumorphic-outset neumorphic-button-hover neumorphic-button-active transition-all text-text-main bg-background">
            IMAX
          </button>
          <button
              className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl px-5 text-sm font-medium neumorphic-outset neumorphic-button-hover neumorphic-button-active transition-all text-text-main bg-background">
            Horror
          </button>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-8 p-4">
          <div className="flex flex-col gap-3 cursor-pointer group neumorphic-card-hover transition-all">
            <div className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl neumorphic-outset"
                 data-alt="Poster for Cosmic Odyssey movie"
                 // style="background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuBrKMWawjlTSkPxmGNbUYCv2VIRV3CCEc6aT6-qZXX25omDCQRXDWvN-Ty3DwM91nhlg_uAv9iGozDf6Ew0_f4ea78yfPraXkUmr5ZcAtIgpcP_U2zT7V6o8Fu3SgUiE0aAy3JRRrCABif2-YUyALXzHCrELAfwLE1fonWrVaEgE01v854qWXMc1rWd04wlfEvs7TuQkLq-XcbchlqgJ9fQUXfMK3yeahUP2gRLj_Kl_HAdyQ-8JWEq7lXTX2UOj9qXl5VziP12he9c&quot;);"
            ></div>
            <div>
              <p className="text-text-main text-base font-bold leading-normal">Cosmic Odyssey</p>
              <p className="text-text-main/70 text-sm font-normal leading-normal">Sci-Fi/Adventure</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 cursor-pointer group neumorphic-card-hover transition-all">
            <div className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl neumorphic-outset"
                 data-alt="Poster for Echoes of Tomorrow movie"
                 // style="background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuAjrsmMv9DhEMWJ5qrx_GYaG5igNKqU_-J8FlSdfHCyBkjPQE7y5pVGJb6En9IrQ2TNCTbjvmwsHbBjjv3t-H3XG8iFZKF8IAQrXvK8wZMvOFwUxpYsnBEa6IUE4KJg3Te0UqmRBENYBC_SYiYDfYJvbnvVpi9_wUClF8-vp5TeuzwoGt0ylaSCxNYr8W4lMVnvnluuqF1ejw1YnTlR3dbjgbmT18xT0MbSG2IJzytLJP3YGnVjeWJ-gb-RrDC75XQIl2Ta62YJmSVj&quot;);"
            ></div>
            <div>
              <p className="text-text-main text-base font-bold leading-normal">Echoes of Tomorrow</p>
              <p className="text-text-main/70 text-sm font-normal leading-normal">Action/Thriller</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 cursor-pointer group neumorphic-card-hover transition-all">
            <div className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl neumorphic-outset"
                 data-alt="Poster for The Last Stand movie"
                 // style="background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuA8o8WCHQZvHu3eLSmOQYQel7zmQKXa8y9Wug3kpHhbjm90zMSUh2lApW8era3LGP_sEnCWEGSGdrhgugk_vxDeRzF6obdhPrHYB6_5Ls6MrgVUiiiYQMMWXn4YLVuHM9AyzRRRoXaEpXQGokfCubZE_R9XWOf6ZpA-Qd0Tc9yTwEoff-vSUz_pK_orJ83LrzyPl7M34wnmPuRBaPnr1oL0yM-0Vh0wDJCT9BaRioOZmBiukZwoqcW9I7BrZnIZIeZaTfRNd0ek-xaP&quot;);"
            ></div>
            <div>
              <p className="text-text-main text-base font-bold leading-normal">The Last Stand</p>
              <p className="text-text-main/70 text-sm font-normal leading-normal">Western</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 cursor-pointer group neumorphic-card-hover transition-all">
            <div className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl neumorphic-outset"
                 data-alt="Poster for Midnight Runner movie"
                 // style="background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuDphhju3Khl3P3etdxN9srYoaXw4CiwDlhucV5O2Iy8-KcVM2pYbUJPLf3ZIclecaOa1ZSDxJinLYOb-OYdTNjZwXEPetytqK_VAlqh_HF2-TCE9KZohowlgGg0GvVxWBj5ZDFPVvgEONDRqVS8c0UfB3blETZbRchQZzm6MHCaGiZOiyzlTBPw8z0_jXiQaF17aX6Gb8j4Lhxu5HgzpgbIuLjnwLhB0I_uzeb2KQnTw7gQa0314L-g00rZ3BuT2EoYV7qS8FC_G3Rm&quot;);"
            ></div>
            <div>
              <p className="text-text-main text-base font-bold leading-normal">Midnight Runner</p>
              <p className="text-text-main/70 text-sm font-normal leading-normal">Crime/Drama</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 cursor-pointer group neumorphic-card-hover transition-all">
            <div className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl neumorphic-outset"
                 data-alt="Poster for City of Dreams movie"
                 // style="background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuDy8in32NhPe2k1_xoJOBFEpnAXqqoEEjmA7V6n9KonOeNsKAdwkITgdZF5B404mUSyQ1viqOdw_B-8XF6Go5XozdrYry_CFUareFVYbN5yZRLFm05HXraXu34TSweBRCBwu715xKSnReVdfAr90mKgm5T-Tr9wAwdSghmasW4x1t0o3j5L4Rruas_m050onGf935VBGw3JWBpAcOTm5JNK0o_V9kMVxFzV59O5GTKKgAG4FAG_C4oANk0lXjsqUtUQ5e8NPsUZ2tLF&quot;);"
            ></div>
            <div>
              <p className="text-text-main text-base font-bold leading-normal">City of Dreams</p>
              <p className="text-text-main/70 text-sm font-normal leading-normal">Musical</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 cursor-pointer group neumorphic-card-hover transition-all">
            <div className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl neumorphic-outset"
                 data-alt="Poster for Forgotten Kingdom movie"
                 // style="background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuCbJOShyDGGVOyu5c-KLAyaBtGzhb7SG1WYAYtjs6qCPTzDB9tD_ikjEu-ohqvduQFK9lkl62gyiIncGNCKl1-qVFslDKIrs4r0pCznre3YAR3XhejhNN8204gqvQpLmphhkn9PFXlHKoUmS6xuAGYG6x49I0RxfRZ0iaNQgsMTcgvtWRQ_IgEU3rB0Nh0tveS-_4l0uckykB7EkQuuSAXbUReMyiG9bqZgaH13DqJSWM7jpXK4AnNNFW00X9NHXF31IGf7tclBI0iP&quot;);"
            ></div>
            <div>
              <p className="text-text-main text-base font-bold leading-normal">Forgotten Kingdom</p>
              <p className="text-text-main/70 text-sm font-normal leading-normal">Fantasy</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 cursor-pointer group neumorphic-card-hover transition-all">
            <div className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl neumorphic-outset"
                 data-alt="Poster for Neon Sunset movie"
                 // style="background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuB_12c-3s5x4yep2J_txGs9M62D2LGoYSny2sj1vhBq3_J4X099iiOcxIVWi0MGHyyTYH4IkmYwR7GstcDi94KPlB6130cmgJNEBBNrSbn6HxNkvUTmPLI7qxS_UptR_jWbZc1wayhz90t5JfAnkZz76DUbXxlFZXcSyxnuPnTGOfdmdo3E9-rTvAZAlFHO0OW-nHHFLPgvtDCx3jequZKB1tygD2Im6P49wIei1iCfj7AvFDPqpWxdQkLCbIWi7Jc5mCH-5g4ghWWJ&quot;);"
            ></div>
            <div>
              <p className="text-text-main text-base font-bold leading-normal">Neon Sunset</p>
              <p className="text-text-main/70 text-sm font-normal leading-normal">Action/Sci-Fi</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 cursor-pointer group neumorphic-card-hover transition-all">
            <div className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl neumorphic-outset"
                 data-alt="Poster for Quantum Leap movie"
                 // style="background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuDs3GReBS6-X6hDvjpFj5HdXQ_Ookl4FVVPbQtleIrj4ByA_vOcv-uZ2uQWBm78Ex8X4e2RSyis6AVSIDO1sguTx1s7-V7JUwCFSBzNnnlZdFzl6AL3IHyeq2QALmrLTvzlmSr8Mhn_1pEBfD_obcyZCq1a_wTo_TPEq1XhcRq3S4FOfkB8_65DlRiJjF8vkYfDf5y0NwObycaL6eCKO1vZY459AWeeJFRXPG0evN5LD1M8wPNQ39iNGiY5_Sn0aq3eLban_WTV4S-4&quot;);"
            >
            </div>
            <div>
              <p className="text-text-main text-base font-bold leading-normal">Quantum Leap</p>
              <p className="text-text-main/70 text-sm font-normal leading-normal">Thriller</p>
            </div>
          </div>
        </div>
      </div>
  );
}
