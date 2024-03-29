module.exports = ->
  @loadNpmTasks "grunt-contrib-copy"

  # Move bower_components and app logic during a build.
  @config "copy",
    release:
      files: [
        src: ["bower_components/**", "app/img/**"],
        dest: "dist/"
      ]
