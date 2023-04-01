import Content from "@/components/Content";

export default function Biography() {
	return (
		<section id="biography">
			<Content>
				<div className="grid md:gap-10 md:grid-cols-[1fr_2fr] place-items-center h-[100dvh] mb-32 md:mb-0">
					<div className="mb-5">
						<a
							href="https://linkedin.com/in/alvarogarciamacias"
							rel="noreferrer"
							target="_blank"
						>
							<img
								src="/images/profile.png"
								alt="profile picture"
								width={200}
								height={200}
								className="border-[7px] rounded-full border-alvaro-white hover:border-dashed cursor-pointer"
							/>
						</a>
					</div>
					<div className="max-w-[75ch]">
						<h2 className="mb-4 text-4xl">
							Hello <span className="text-alvaro-danger">World</span>!
						</h2>
						<p>
							My name is{" "}
							<span className="text-xl text-alvaro-primary">Álvaro</span> and I
							am a Full Stack Developer.
							<br />
							I feel very fortunate to have found what I am passionate about and
							to make it my job.
							<br />
							I have also worked managing, training and leading marketing teams
							at a national level.
							<br />
							If there is one thing that characterises me, it is that I am 100%
							involved in everything I do.
							<br />
							I am hard-working, perfectionist and non-conformist.
							<br />
							I have a direct and creative working style. And I put all the
							energy I get from working in what I am so enthusiastic about.
						</p>
					</div>
				</div>
			</Content>
		</section>
	);
}
