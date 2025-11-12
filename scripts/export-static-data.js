#!/usr/bin/env node

/**
 * Export Static Data Script
 * Exports PostgreSQL data to JSON files for GitHub Pages deployment
 * 
 * Usage: node scripts/export-static-data.js
 */

const fs = require('fs');
const path = require('path');
const TypeORM = require('typeorm');

// Read ormconfig.json
const ormconfigPath = path.join(__dirname, '../ormconfig.json');
const ormconfig = JSON.parse(fs.readFileSync(ormconfigPath, 'utf8'));

const dataDir = path.join(__dirname, '../client/public/data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log(`✅ Created data directory: ${dataDir}`);
}

async function exportData() {
  try {
    console.log('🔄 Connecting to database...');
    
    // Create connection
    const connection = await TypeORM.createConnection({
      type: 'postgres',
      host: ormconfig.host,
      port: ormconfig.port,
      username: ormconfig.username,
      password: ormconfig.password,
      database: ormconfig.database,
      entities: [
        path.join(__dirname, '../app/src/db/models/*.ts')
      ],
      synchronize: false,
      logging: false
    });

    console.log('✅ Connected to database');

    // Get repository managers
    const vaccineRepo = connection.getRepository('Vaccine');
    const newsRepo = connection.getRepository('News');

    console.log('📥 Exporting vaccines...');
    const vaccines = await vaccineRepo.find({
      order: { name: 'ASC' }
    });
    
    console.log(`  Found ${vaccines.length} vaccines`);
    fs.writeFileSync(
      path.join(dataDir, 'vaccines.json'),
      JSON.stringify({ data: vaccines }, null, 2)
    );
    console.log('✅ Saved vaccines.json');

    console.log('📥 Exporting news...');
    const news = await newsRepo.find({
      order: { publishedAt: 'DESC' },
      take: 1000
    });
    
    console.log(`  Found ${news.length} news articles`);
    fs.writeFileSync(
      path.join(dataDir, 'news.json'),
      JSON.stringify({ data: news }, null, 2)
    );
    console.log('✅ Saved news.json');

    // Create index file for easy reference
    const indexData = {
      exportDate: new Date().toISOString(),
      vaccines: {
        count: vaccines.length,
        file: 'vaccines.json'
      },
      news: {
        count: news.length,
        file: 'news.json'
      }
    };

    fs.writeFileSync(
      path.join(dataDir, 'index.json'),
      JSON.stringify(indexData, null, 2)
    );
    console.log('✅ Saved index.json');

    await connection.close();
    console.log('\n✨ Data export complete!');
    console.log(`📁 Files saved to: ${dataDir}`);
    console.log(`
Summary:
  📊 Vaccines: ${vaccines.length}
  📰 News: ${news.length}
  💾 Total size: ~${Math.round((fs.statSync(path.join(dataDir, 'vaccines.json')).size + fs.statSync(path.join(dataDir, 'news.json')).size) / 1024)} KB
    `);

  } catch (error) {
    console.error('❌ Error during export:', error.message);
    process.exit(1);
  }
}

// Run export
exportData();
