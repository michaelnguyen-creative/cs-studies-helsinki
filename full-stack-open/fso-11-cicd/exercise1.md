Oftentimes when we refer to CI/CD, we don't specifically associate it with any particular programming language. Rather, CI/CD systems are designed to work with as many programming languages & platforms as possible, as the goal of CI/CD is more robust software with fewer bugs & better team process & cooperation. 

In our case where the software is in active development & written in Python (and other unfamilar languages), the ecosystem of tools & libraries for linting, testing & building are huge. However, we can name a few popular tools for such tasks: Pylint (static code analyzer for Python) & PyCharm (IDE with built-in code analysis feature) etc. for linting, pytest & unittest & doctest etc. for testing Python code, Scons for python software construction (build) tasks.

In addition to Jenkins & Github Actions, the CI landscape also includes many other solutions such as TravisCI, CircleCI, AWS CodePipeline, Azure Pipelines etc. Each of these platforms may offer different features & integrations with other services and cloud providers etc.; the choice of an CI tool often depends on your project needs & other technical requirements (e.g., version control system support & integration etc.).

As for our small project with a team of six developers, a cloud-based CI setup seems more reasonable, since we can abstract away the complexity of setting up & running of CI environment to the cloud provider, to focus on development tasks (writing, testing, deploying code etc.). Again, when it comes to choosing between self-hosted or cloud-based CI solution, you need to take into consideration your project technical (e.g., hardware & software configs) & non-technical (team sizes, number of teams, organization sizes etc.) requirements.


<!-- The points to discuss:
Some common steps in a CI setup include linting, testing, and building. What are the specific tools for taking care of these steps in the ecosystem of the language you picked? You can search for the answers by google.

What alternatives are there to set up the CI besides Jenkins and GitHub Actions? Again, you can ask google!

Would this setup be better in a self-hosted or a cloud-based environment? Why? What information would you need to make that decision? -->